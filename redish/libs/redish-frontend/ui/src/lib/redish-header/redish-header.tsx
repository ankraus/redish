import styles from './redish-header.module.scss';

/* eslint-disable-next-line */
export interface RedishHeaderProps {}

export function RedishHeader(props: RedishHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RedishHeader!</h1>
    </div>
  );
}

export default RedishHeader;
