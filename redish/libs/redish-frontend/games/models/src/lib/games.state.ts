import { RedishError } from "@redish-shared/domain";
import { Filter } from "./filter.model";
import { GameViewModel } from "./game-view.model";

export interface GamesState {
  games: GameViewModel[];
  totalGamesCount: number;
  loading: boolean;
  error?: RedishError;
  filter: Filter;
}
