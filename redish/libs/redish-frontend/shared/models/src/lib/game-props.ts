import { Result } from '@redish-shared/domain';

export interface GameProps {
  username?: string;
  verify?: (word: string) => Promise<Result<boolean>>;
  toast?: (text: string, type: 'error' | 'info') => void;
}
