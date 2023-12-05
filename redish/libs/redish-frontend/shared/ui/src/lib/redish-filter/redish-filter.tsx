import cn from 'classnames';
import RedishButton from '../redish-button/redish-button';
import RedishCard from '../redish-card/redish-card';
import styles from './redish-filter.module.scss';
import { useState } from 'react';

export interface RedishFilterViewModel {
  filter?: string;
  skip: number;
  take: number;
  total: number;
  handleFilterSet: (filter?: string) => void;
  handleTakeSet: (take: number) => void;
}

export function RedishFilter({
  total,
  filter,
  skip,
  take,
  handleFilterSet,
  handleTakeSet,
}: RedishFilterViewModel) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className={cn(styles.container, showFilter && styles.show)}>
      <RedishButton
        className={styles.filterButton}
        onClick={() => {
          setShowFilter(!showFilter);
        }}
      >
        <img
          className={styles.funnel}
          src="assets/icons/filter-icon.svg"
          alt="funnel"
        />
      </RedishButton>

      <div className={cn(styles.filter, showFilter && styles.show)}>
        <div className={cn(styles.filterItem, styles.search)}>
          <input
            type="text"
            id="filter"
            placeholder="filter"
            value={filter}
            onChange={(event) => handleFilterSet(event.target.value)}
          />
          <img
            className={styles.search}
            src="assets/icons/search.svg"
            alt="search"
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="take">Page size</label>
          <input
            className={styles.take}
            type="number"
            id="take"
            min="1"
            max="100"
            value={take}
            onChange={(event) => {
              let num = parseInt(event.target.value);
              num = isNaN(num) ? 1 : num;
              handleTakeSet(Math.max(1, Math.min(100, num)));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RedishFilter;
