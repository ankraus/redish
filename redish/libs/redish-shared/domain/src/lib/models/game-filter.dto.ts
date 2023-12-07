import { FilterDto } from "./filter.dto";

export interface GameFilterDto extends FilterDto {
  minNumberOfPlayers?: number;
  maxNumberOfPlayers?: number;
}
