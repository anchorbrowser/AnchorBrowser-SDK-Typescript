// Spec-derived file. Keep in sync with spec/openapi.yaml — see CONTRIBUTING.md.

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
