import { RedishError } from "@redish-shared/domain";
import { Filter } from "./filter.model";
import { GameViewModel } from "./game-view.model";

export interface GamesState {
  initialized: boolean;
  loading: boolean;
  error?: RedishError;
  games: GameViewModel[];
  totalGamesCount: number;
  filter: Filter;
}
