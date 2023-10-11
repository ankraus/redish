import styles from './redish-ui.module.scss';

/* eslint-disable-next-line */
export interface RedishUiProps {}

export function RedishUi(props: RedishUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RedishUi!</h1>
    </div>
  );
}

export default RedishUi;
