import styles from 'css/AsignObjectives.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import { ObjectivesList } from 'static/AssignObjectives';
import { Dispatch, SetStateAction, useState } from 'react';
import CheckBox from 'shared/CheckBox';

export default function AssignAccountObjectives() {
  const [objectives, setObjectives] = useState([...ObjectivesList]);
  const handleSelectedObjective = (el: any) => {
    if (el) {
      const updatedObjectives = [...objectives];
      updatedObjectives.forEach(elem => {
        if (elem.key === el.key) {
          elem.selected = !elem.selected;
        }
      });
      setObjectives(updatedObjectives);
    }
  };
  return (
    <Container className='mb-4'>
      <Row>
        <Col lg={12}>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Assign Objectives</h3>
            <p className={styles.createSegmentDesc}>
              Assign an objective to each of your segments.
            </p>
          </div>
        </Col>
        <div className={styles.formContainer}>
          <Col className='mx-auto' lg={7}>
            <Col
              lg={12}
              className={`${styles.fieldContainer} ${styles.fieldSeperator} `}
            >
              <Row>
                <SelectField
                  fieldSelect
                  col={12}
                  disabled={false}
                  fieldName='segmentName'
                  fields={[{ label: 'Service', value: '1' }]}
                  label='SEGMENT NAME'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select Country'
                  value={'1'}
                />
              </Row>
            </Col>
            <Col
              lg={12}
              className={`${styles.fieldOption} customformCheck mb-4`}
            >
              <Row>
                <p className='mb-1' style={{ textAlign: 'left' }}>
                  SELECT OBJECTIVE
                </p>
                {objectives.length
                  ? objectives.map(el => (
                      <Col lg={4} md={12}>
                        <div
                          className={
                            !el.selected
                              ? styles.objectivesDiv
                              : styles.selectedObjectivesDiv
                          }
                        >
                          <CheckBox
                            field={el}
                            defaultChecked={el.selected}
                            onChange={handleSelectedObjective}
                            customClass='customCheckboxComponent'
                          />

                          <div className={styles.objectiveDetails}>
                            <h4
                              className={
                                !el.selected
                                  ? styles.objectivesHeading
                                  : styles.selectedObjectivesHeading
                              }
                            >
                              {el.name}
                            </h4>
                            <p
                              className={
                                !el.selected
                                  ? styles.objectivesDesc
                                  : styles.selectedObjectivesDesc
                              }
                            >
                              {el.description}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))
                  : null}
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldOption}>
              <p>
                By selecting this option you are granting permission to
                reallocate your budget automatically in pursuit of your
                performance goals
              </p>
            </Col>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
