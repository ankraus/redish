export interface GameViewModel {
  id: string;
  name: string;
  route: string;
  previewImages: { small: string; large: string };
  previewColor: 'green' | 'redish-light';
}
