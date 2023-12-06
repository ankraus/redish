import cn from 'classnames';
import styles from './redish-loading.module.scss';

export interface RedishLoadingProps {
  absolute?: boolean;
}

export function RedishLoading({absolute = false}: RedishLoadingProps) {
  return (
    <div className={cn(styles.container, absolute && styles.absolute)}>
      <h1>Loading...</h1>
    </div>
  );
}

export default RedishLoading;
