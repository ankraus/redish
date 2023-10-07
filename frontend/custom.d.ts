// To use non-code assets with TypeScript, we need to defer the type for these imports
// https://webpack.js.org/guides/typescript/#importing-other-assets

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}