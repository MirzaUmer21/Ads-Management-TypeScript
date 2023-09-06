import React, { useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import styles from 'css/CreateRules.module.css';
import SelectField from 'shared/SelectField';
import InputField from 'shared/InputField';

import { createdRules } from 'static/createdRules';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';

export default function CreateAccountRules({
  setShow,
  setData
}: AccountsCreateRulesprops) {
  const [rules, setRules] = useState([...createdRules]);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });

  const deteteRulesHandler = (key: number) => {
    const temp = [...rules];
    const updatedData = temp.filter((elem, i) => elem.key !== key);
    setRules(updatedData);
  };
  const handleSelectedRules = (key: number) => {
    const updatedRules = [...createdRules];
    updatedRules.forEach(elem => {
      if (elem['key'] === key) {
        elem['selected'] = !elem['selected'];
      }
    });
    setRules(updatedRules);
  };
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Create Rules</h3>
            <p className={styles.createSegmentDesc}>
              Create budgetary rules based on your designated capacity{' '}
            </p>
          </div>
        </Col>
        <div className={styles.formContainer}>
          <Col className='mx-auto' lg={7}>
            <Col lg={12} className={styles.fieldContainer}>
              <Row>
                <Col lg={6} className={styles.rulesSelect}>
                  <SelectField
                    fieldSelect
                    col={6}
                    disabled={false}
                    fieldName='segment'
                    fields={[{ label: 'Service', value: '1' }]}
                    label='Segments'
                    onChange={(val: any) => {
                      //console.log(val);
                    }}
                    placeholder='Select segment'
                    value={'1'}
                  />
                </Col>
                <Col lg={6} className='assignCapacityCustomSelect'>
                  <SelectField
                    fieldSelect
                    col={6}
                    disabled={false}
                    fieldName='metric'
                    fields={[
                      {
                        label: 'Capacity',
                        value: '1'
                      }
                    ]}
                    label='METRIC'
                    onChange={(val: any) => {
                      //console.log(val);
                    }}
                    placeholder='Select metric'
                    value={'1'}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <Row className={styles.fieldWhite}>
                <InputField
                  col={4}
                  label='HAS CONDITION (>=)'
                  name='segment'
                  placeholder='>'
                  type='text'
                  disabled
                  className='customConditionClass'
                />
                <InputField
                  col={4}
                  label='OF'
                  name='OF'
                  placeholder='100%'
                  type='text'
                  className='customConditionClass'
                />
                <InputField
                  col={4}
                  label='FOR'
                  name='for'
                  placeholder='Today'
                  type='text'
                  className='customConditionClass'
                />
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <Row className={styles.fieldWhite}>
                <SelectField
                  fieldSelect
                  col={6}
                  disabled={false}
                  fieldName='Then'
                  fields={[{ label: 'Decrease Budget', value: '1' }]}
                  label='Then'
                  onChange={(val: any) => {
                    //console.log(val);
                  }}
                  placeholder='Select Then'
                  value={'1'}
                />
                <InputField
                  col={6}
                  label='AMOUNT'
                  name='amount'
                  placeholder='50%'
                  type='text'
                  className='customConditionClass'
                />
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <Row className={styles.fieldWhite}>
                <InputField
                  col={12}
                  label='ELSE'
                  name='else'
                  placeholder='50%'
                  type='text'
                  className='customConditionClass'
                />
              </Row>
            </Col>
          </Col>
          <Col lg={12} className={styles.fieldContainer}>
            <p>Created Rules</p>
          </Col>
          <Col lg={12}>
            {isTabletOrMobile ? (
              <Row>
                {!rules.length ? (
                  <p>No Data Found</p>
                ) : (
                  rules.map((elem, index) => {
                    return (
                      <Col sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body
                            className={
                              elem['selected']
                                ? styles.selectedCompaignsCard
                                : styles.CompaignsCard
                            }
                          >
                            <Card.Title className='mb-3'>
                              <div className='d-flex align-items-center'>
                                <input
                                  checked={elem['selected']}
                                  type='checkbox'
                                  value='install'
                                  id={`rulesCheckBox-` + elem.key}
                                  className={`form-check-input`}
                                  onChange={e => {
                                    handleSelectedRules(elem.key);
                                  }}
                                />
                              </div>
                              <div className='tableCardsOptions justify-content-end'>
                                <i
                                  onClick={() => {
                                    setShow(true);
                                    setData(elem);
                                  }}
                                  className='fa-solid fa-pen'
                                  style={{ cursor: 'pointer' }}
                                ></i>
                                <TableMenuDropdown
                                  hasEditOption={false}
                                  deleteHandler={() =>
                                    deteteRulesHandler(elem.key)
                                  }
                                />
                              </div>
                            </Card.Title>
                            <Row>
                              {elem.content.map((el, ind) => {
                                return (
                                  <Col xs={6} key={ind} className='mb-3'>
                                    <div className='d-flex'>
                                      <div className='d-flex flex-column'>
                                        <strong>{el.heading}</strong>
                                        <span>{el.value}</span>
                                      </div>
                                    </div>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                )}
              </Row>
            ) : (
              <div>
                <div
                  style={{
                    height: rules.length > 2 ? '170px' : 'inherit'
                  }}
                  className={` ${rules.length > 2 && 'tableScrollWrap'} + ${
                    styles.createRulesTableWrap
                  }`}
                >
                  <Table className='fulcrumDefaultTable'>
                    <tbody>
                      {!rules.length ? (
                        <p>No Data Found</p>
                      ) : (
                        rules.map((elem, index) => {
                          return (
                            <tr
                              key={index}
                              className={
                                elem['selected']
                                  ? styles.selectedCompaignsDiv
                                  : styles.CompaignsDiv
                              }
                            >
                              <td className={styles.checkboxCol}>
                                <input
                                  style={{
                                    margin: '0 0 0 5px'
                                  }}
                                  checked={elem['selected']}
                                  type='checkbox'
                                  value='install'
                                  id={`rulesCheckBox-` + elem.key}
                                  className={`form-check-input`}
                                  onChange={e => {
                                    handleSelectedRules(elem.key);
                                  }}
                                />
                              </td>
                              {elem['content'].map(el => {
                                return (
                                  <>
                                    <td>
                                      <div className='d-flex'>
                                        <div className='d-flex flex-column'>
                                          <strong>{el.heading}</strong>
                                          <span>{el.value}</span>
                                        </div>
                                      </div>
                                    </td>
                                  </>
                                );
                              })}
                              <td>
                                <div
                                  className={`align-items-center ${styles.rulesTableActions}`}
                                >
                                  <i
                                    onClick={() => {
                                      setShow(true);
                                      setData(elem);
                                    }}
                                    className='fa-solid fa-pen'
                                  ></i>
                                  <TableMenuDropdown
                                    hasEditOption={false}
                                    deleteHandler={() =>
                                      deteteRulesHandler(elem.key)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </Col>
        </div>
      </Row>
    </Container>
  );
}
interface AccountsCreateRulesprops {
  setShow: (show: boolean) => void;
  setData: any;
}
