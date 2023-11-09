import { GameViewModel } from "./game-view.model";

export interface GamesListViewModel {
  games: Array<GameViewModel>;
  handleGameClicked: (route: string) => void;
}
