import cn from 'classnames';
import styles from './redish-error.module.scss';
import { RedishError as DomainError } from '@redish-shared/domain';

export interface RedishErrorProps {
  error: DomainError;
  className?: string;
}

export function RedishError({ error, className }: Readonly<RedishErrorProps>) {
  return (
    <div className={cn(styles.error, className)}>
      {error.message}
      <p>{error.code}</p>
      <p>{error.cause as string}</p>
    </div>
  );
}

export default RedishError;
