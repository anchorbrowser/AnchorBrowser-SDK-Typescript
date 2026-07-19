/**
 * Deterministic request-argument synthesis from the OpenAPI spec.
 *
 * For every operation the wire-parity suite builds a minimal, fixed call:
 * required path/query parameters and (when required) a request body with
 * only the required properties. Values are constant so snapshots are stable.
 */

export const FIXED = {
  uuid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  string: 'string',
  url: 'https://example.com',
  dateTime: '2024-01-01T12:00:00Z',
  int: 1,
  number: 1,
  bool: true,
};

type AnySchema = any;

export class Synthesizer {
  constructor(private spec: AnySchema) {}

  private resolve(schema: AnySchema, depth: number): AnySchema {
    if (schema?.$ref) {
      const name = schema.$ref.split('/').pop()!;
      const target = this.spec.components?.schemas?.[name];
      // unresolved $ref (spec bug) — treat as free-form object
      if (!target) return { type: 'object' };
      return this.resolve(target, depth);
    }
    return schema ?? {};
  }

  buildValue(rawSchema: AnySchema, depth = 0): unknown {
    if (depth > 6) return {};
    const schema = this.resolve(rawSchema, depth);

    if (schema.example !== undefined) return schema.example;
    if (schema.default !== undefined) return schema.default;
    if (Array.isArray(schema.enum) && schema.enum.length > 0) return schema.enum[0];

    if (Array.isArray(schema.allOf)) {
      const merged: AnySchema = { type: 'object', properties: {}, required: [] };
      for (const part of schema.allOf) {
        const resolved = this.resolve(part, depth + 1);
        Object.assign(merged.properties, resolved.properties ?? {});
        merged.required.push(...(resolved.required ?? []));
      }
      return this.buildValue(merged, depth + 1);
    }
    if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
      return this.buildValue(schema.oneOf[0], depth + 1);
    }
    if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
      return this.buildValue(schema.anyOf[0], depth + 1);
    }

    switch (schema.type) {
      case 'string': {
        if (schema.format === 'uuid') return FIXED.uuid;
        if (schema.format === 'uri' || schema.format === 'url') return FIXED.url;
        if (schema.format === 'date-time') return FIXED.dateTime;
        if (schema.format === 'binary') return new File(['Example data'], 'example.txt');
        return FIXED.string;
      }
      case 'integer':
        return FIXED.int;
      case 'number':
        return FIXED.number;
      case 'boolean':
        return FIXED.bool;
      case 'array':
        return [this.buildValue(schema.items ?? {}, depth + 1)];
      case 'object':
      default: {
        const out: Record<string, unknown> = {};
        const required: string[] = schema.required ?? [];
        for (const name of required) {
          out[name] = this.buildValue(schema.properties?.[name] ?? {}, depth + 1);
        }
        return out;
      }
    }
  }

  /** Build the hey-api options object ({ path, query, body }) for an operation. */
  buildOptions(pathTemplate: string, method: string): Record<string, unknown> {
    const pathItem = this.spec.paths[pathTemplate];
    const op = pathItem[method];
    const options: Record<string, unknown> = {};

    const params = [...(pathItem.parameters ?? []), ...(op.parameters ?? [])].map((p: AnySchema) =>
      p.$ref ? this.resolve(p, 0) : p,
    );

    const pathParams: Record<string, unknown> = {};
    const queryParams: Record<string, unknown> = {};
    for (const param of params) {
      if (param.in === 'path') {
        const name = String(param.name);
        pathParams[name] =
          /id$/i.test(name) ? FIXED.uuid : (this.buildValue(param.schema ?? { type: 'string' }, 1) as string);
      } else if (param.in === 'query' && param.required) {
        queryParams[String(param.name)] = this.buildValue(param.schema ?? { type: 'string' }, 1);
      }
    }
    if (Object.keys(pathParams).length > 0) options['path'] = pathParams;
    if (Object.keys(queryParams).length > 0) options['query'] = queryParams;

    const requestBody = op.requestBody ? this.resolve(op.requestBody, 0) : undefined;
    if (requestBody?.required) {
      const content = requestBody.content ?? {};
      const contentType =
        'application/json' in content ? 'application/json' : (Object.keys(content)[0] as string | undefined);
      if (contentType) {
        options['body'] = this.buildValue(content[contentType]?.schema ?? {}, 0);
      }
    }

    return options;
  }

  /** Content type of an operation's 2xx response (default application/json). */
  successContentType(pathTemplate: string, method: string): string {
    const op = this.spec.paths[pathTemplate][method];
    for (const status of ['200', '201', '202', '204']) {
      const resp = op.responses?.[status];
      if (!resp) continue;
      const content = resp.content ?? {};
      const types = Object.keys(content);
      if (types.length > 0) return types[0]!;
    }
    return 'application/json';
  }
}
