export interface Filter {
  skip: number;
  take: number;
  filter?: string;
  minNumberOfPlayers?: number;
  maxNumberOfPlayers?: number;
}
