import { useState } from 'react';
import styles from 'css/Dashboard.module.css';
import MediaQuery from 'react-responsive';
import { Col } from 'react-bootstrap';

export default function DashboardTableFilters({
  DashboardFilters
}: DashboardTableProps) {
  const [isActive, setisActive] = useState<Array<any>>([2, 5]);
  const activeHandler = (key: any) => {
    let temp: any = [...isActive];

    if (temp.includes(key)) {
      temp = temp.filter(function (item: any) {
        return item !== key;
      });
    } else temp.push(key);
    setisActive(temp);
  };

  const [isFilter, setIsFilter] = useState(false);

  const toggleTableFilter = () => {
    isFilter ? setIsFilter(false) : setIsFilter(true);
  };

  return (
    <>
      <Col lg={12}>
        <MediaQuery maxWidth={1200}>
          <div
            className={`${isFilter ? styles.enableFilter : ''} ${
              styles.mobileFilter
            }`}
          >
            <i
              onClick={toggleTableFilter}
              className='fa-solid fa-filter filterIcon'
            ></i>
            {isFilter && (
              <ul id={styles.filters}>
                {DashboardFilters &&
                  DashboardFilters.map((filterData, index) => {
                    return (
                      <li
                        key={index}
                        onClick={e => activeHandler(filterData.key)}
                      >
                        {filterData.FilterName !== '' ? (
                          <span
                            className={
                              isActive.includes(filterData.key)
                                ? styles.activeFilter
                                : ''
                            }
                          >
                            {filterData.FilterName}
                          </span>
                        ) : (
                          ''
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={1200}>
          <ul id={styles.filters}>
            <li>
              <i className='fa-solid fa-filter filterIcon'></i>
            </li>
            {DashboardFilters &&
              DashboardFilters.map((filterData, index) => {
                return (
                  <li key={index} onClick={e => activeHandler(filterData.key)}>
                    {filterData.FilterName !== '' ? (
                      <span
                        className={
                          isActive.includes(filterData.key)
                            ? styles.activeFilter
                            : ''
                        }
                      >
                        {filterData.FilterName}
                      </span>
                    ) : (
                      ''
                    )}
                  </li>
                );
              })}
          </ul>
        </MediaQuery>
      </Col>
    </>
  );
}
interface DashboardTableProps {
  DashboardFilters: Array<DashboardFiltersProps>;
}
interface DashboardFiltersProps {
  key: number;
  FilterName: string;
}
