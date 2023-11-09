import styles from './redish-header.module.scss';

/* eslint-disable-next-line */
export interface RedishHeaderProps {
  handleLogout: () => void;
}

export function RedishHeader(props: RedishHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RedishHeader!</h1>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  );
}

export default RedishHeader;
