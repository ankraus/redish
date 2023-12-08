import styles from './redish-pagination.module.scss';

export interface RedishPaginationViewModel {
  total: number;
  skip: number;
  take: number;
  handleSkipSet: (skip: number) => void;
}

export function RedishPagination({
  total,
  skip,
  take,
  handleSkipSet,
}: Readonly<RedishPaginationViewModel>) {
  if (total === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.flip}
        disabled={skip === 0}
        onClick={(event) => {
          event.preventDefault();
          handleSkipSet(skip - take);
        }}
      >
        <span>{'<'}</span>
      </button>
      <div className={styles.page}>
        {skip + 1} - {Math.min(total, skip + take)} of {total}
      </div>
      <button
        className={styles.flip}
        disabled={skip + take >= total}
        onClick={(event) => {
          event.preventDefault();
          handleSkipSet(skip + take);
        }}
      >
        <span>{'>'}</span>
      </button>
    </div>
  );
}

export default RedishPagination;
