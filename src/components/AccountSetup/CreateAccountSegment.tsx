import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import InputField from 'shared/InputField';
import { SegmentsCreateOptions } from 'static/SegmentsCreateOptions';
import CheckBox, { segment } from 'shared/CheckBox';
import { Dispatch, SetStateAction, useState } from 'react';

export default function CreateAccountSegment() {
  const [segments, setSegments] = useState([...SegmentsCreateOptions]);
  const handleSelectedSegment = (el: segment) => {
    if (el.id) {
      const updatedSegments = [...segments];
      updatedSegments.forEach(elem => {
        if (elem.id === el.id) {
          elem.checked = !elem.checked;
        }
      });
      setSegments(updatedSegments);
    }
  };

  return (
    <Container className='mb-4'>
      <Row>
        <Col lg={12}>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Create Segment</h3>
            <p className={styles.createSegmentDesc}>
              Create a new business segment, that you'd like to tie to your
              goals, team and budgets. Such as a service type or a service area.{' '}
            </p>
          </div>
        </Col>
        <div className={styles.formContainer}>
          <Col className='mx-auto' lg={7}>
            <Col lg={12} className={styles.fieldContainer}>
              <Row>
                <InputField
                  col={8}
                  label='Segment Name'
                  name='segment'
                  placeholder='Service'
                  type='text'
                />
                <Col lg={4}>
                  <Button className={styles.CreateSegmentNameBtn}>
                    Create
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={12} className={styles.orSpacing}>
              <p>or</p>
            </Col>
            <Col
              lg={12}
              className={`${styles.fieldOption} customformCheck mb-4`}
            >
              {segments.map((el: any, index: any) => {
                return (
                  <>
                    <div className='form-group'>
                      <div
                        className={
                          el.checked
                            ? styles.checkboxSelectedContain
                            : styles.checkboxContain
                        }
                      >
                        <CheckBox
                          field={el}
                          onChange={handleSelectedSegment}
                          defaultChecked={el.checked}
                          isLabel={true}
                        />
                        <div className={styles.checboxText}>
                          <span
                            className={
                              el.checked ? styles.optionsSelectedDesc : ''
                            }
                          >
                            {el.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </Col>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
