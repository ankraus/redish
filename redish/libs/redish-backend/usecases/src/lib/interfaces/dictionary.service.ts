import {Result} from "@redish-backend/domain";

export abstract class DictionaryService {
  abstract validate(word: string): Promise<Result<boolean>>;
}