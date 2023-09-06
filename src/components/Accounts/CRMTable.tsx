import { Fragment, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'shared/Slider';
import styles from 'css/Accounts.module.css';

import { CRMTableData } from 'static/CRMTable';

export default function CRMTable({ setShow, show }: AccountsNavProps) {
  const [isActive, setisActive] = useState<Array<number>>([2]);

  const handleClick = (key: number) => {
    document
      .getElementsByTagName('body')[0]
      .setAttribute('style', 'overflow:hidden');
    setShow(true);
    let temp: number[] = [...isActive];
    if (temp.includes(key)) {
      temp = temp.filter(function (item: number) {
        return item !== key;
      });
    } else temp.push(key);
    setisActive(temp);
  };

  return (
    <Fragment>
      <div className={styles.accountsCrmWrapper}>
        <Container>
          <Row>
            <h3 className='mb-0'>CRM</h3>
            <Col lg={12}>
              {/* <Slider
                handleClick={handleClick}
                isActive={isActive}
                Content={CRMTableData}
              /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}
interface AccountsNavProps {
  setShow: (show: boolean) => void;
  show: boolean;
}
