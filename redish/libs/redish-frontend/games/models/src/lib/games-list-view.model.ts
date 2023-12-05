import { GameViewModel } from "./game-view.model";

export interface GamesListViewModel {
  games: Array<GameViewModel>;
  total: number;
  handleGameClicked: (route: string) => void;
  handleFilterSet: (filter?: string) => void;
  handleSkipSet: (skip: number) => void;
  handleTakeSet: (take: number) => void;
}
