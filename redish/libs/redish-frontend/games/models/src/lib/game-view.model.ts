export interface GameViewModel {
  name: string;
  route: string;
  previewImages: { small: string; large: string };
  previewColor: 'green' | 'redish-light';
}
