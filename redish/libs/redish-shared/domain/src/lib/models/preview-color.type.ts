export const previewColorValues = ['green', 'redish-light'] as const;
export type PreviewColor = (typeof previewColorValues)[number];
