import cn from 'classnames';
import RedishButton from '../redish-button/redish-button';
import styles from './redish-filter.module.scss';
import { useState } from 'react';

export interface RedishFilterViewModel {
  searchPlaceholder: string;
  searchHoverText: string;
  filter?: string;
  take: number;
  handleFilterSet: (filter?: string) => void;
  handleTakeSet: (take: number) => void;
  numberFilterItems?: Array<{
    label: string;
    placeholder: string;
    hoverText: string;
    min?: number;
    max?: number;
    value?: number;
    set: (value?: number) => void;
  }>;
}

export function RedishFilter({
  searchPlaceholder,
  searchHoverText,
  filter,
  take,
  handleFilterSet,
  handleTakeSet,
  numberFilterItems,
}: Readonly<RedishFilterViewModel>) {
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
            placeholder={searchPlaceholder}
            title={searchHoverText}
            value={filter}
            onChange={(event) => handleFilterSet(event.target.value)}
          />
          <img
            className={styles.search}
            src="assets/icons/search.svg"
            alt="search"
          />
        </div>
        {numberFilterItems && (
          <div className={styles.numberFilterItems}>
            {numberFilterItems.map((filterItem, index) => (
              <div
                key={`filter-item-${filterItem.label.replace(' ', '')}`}
                className={styles.filterItem}
              >
                <label htmlFor={`filter-item-${index}`}>
                  {filterItem.label}
                </label>
                <input
                  type="number"
                  id={`filter-item-${index}`}
                  min={filterItem.min}
                  max={filterItem.max}
                  value={filterItem.value}
                  placeholder={filterItem.placeholder}
                  title={filterItem.hoverText}
                  onChange={(event) => {
                    let num: number | undefined = parseInt(event.target.value);
                    num = Math.max(
                      filterItem.min ?? 0,
                      Math.min(filterItem.max ?? Number.MAX_VALUE, num)
                    );
                    num = isNaN(num) ? filterItem.min : num;
                    filterItem.set(num);
                  }}
                />
              </div>
            ))}{' '}
          </div>
        )}
        <div className={styles.filterItem}>
          <label htmlFor="take">Page size</label>
          <input
            className={styles.take}
            type="number"
            id="take"
            min="1"
            max="100"
            value={take}
            title='I want to see this many items per page.'
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
