import React, { useState } from 'react';
import styles from '../css/TableFilters.module.css';
import MediaQuery from 'react-responsive';

export default function TableFilters({
  TableFiltersData,
  toggle,
  range
}: TableFilterProps) {
  const [isFilter, setIsFilter] = useState(false);

  const toggleTableFilter = () => {
    isFilter ? setIsFilter(false) : setIsFilter(true);
  };
  return (
    <>
      <MediaQuery minWidth={1200}>
        <div className={styles.filtersWrapper}>
          <ul className={styles.filterList}>
            {TableFiltersData?.map((elem, index) => {
              return (
                <li key={index}>
                  {elem.value}
                  <i className='fa-solid fa-pipe'></i>
                </li>
              );
            })}
            <li>
              <i
                onClick={toggle}
                className={`my-collapsible__toggle ${
                  !range ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
                }`}
              ></i>
            </li>
          </ul>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1200}>
        <div
          className={`${isFilter ? styles.enableFilter : ''} ${
            styles.mobileFilter
          }`}
        >
          <i
            style={{ cursor: 'pointer' }}
            onClick={toggleTableFilter}
            className='fa-solid fa-filter filterIcon mb-2'
          ></i>
          <i
            style={{
              marginLeft: '15px',
              fontSize: '20px'
            }}
            onClick={toggle}
            className={`my-collapsible__toggle ${
              !range ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
            }`}
          ></i>

          {isFilter && (
            <div className={styles.filtersWrapper}>
              <ul className={styles.filterList}>
                {TableFiltersData?.map((elem, index) => {
                  return (
                    <li key={index}>
                      {elem.value}
                      <i
                        className={`${styles.filterBars} fa-solid fa-pipe`}
                      ></i>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </MediaQuery>
    </>
  );
}
interface TableFilterProps {
  TableFiltersData: Array<TableFiltersProps>;
  toggle?: any;
  range?: any;
}
interface TableFiltersProps {
  key: number;
  value: string;
}
