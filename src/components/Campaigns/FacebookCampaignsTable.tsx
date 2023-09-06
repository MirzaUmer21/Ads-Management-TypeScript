import React from 'react';
import { Table, Form, Row, Col, Card } from 'react-bootstrap';
import styles from 'css/Campaigns.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from 'app/hooks';

export default function FacebookCampaignsTable({
  show,
  setShow,
  setEditData
}: FacebookCampaignsTableProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const deleteCampaignHandler = (id: number) => {
    // const temp = [...data];
    // const newData = temp.filter(elem => elem.id !== id);
    // setData(newData);
  };
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );

  return (
    // <>
    //   <SlideToggle
    //     render={({ toggle, setCollapsibleElement, range }) => (
    //       <div className='my-collapsible'>
    //         <div>
    //           <ul className={styles.campaignFilterList}>
    //             {CampaignsTableFilters?.map((elem, index) => {
    //               return (
    //                 <>
    //                   <li>
    //                     <img src={elem.imageUrl} alt='' />
    //                   </li>
    //                   <li>
    //                     <div className={styles.campaignfilterTitle}>
    //                       <strong> {TableData.heading}</strong>
    //                       <span>{elem.CampaignValue}</span>
    //                     </div>
    //                   </li>
    //                 </>
    //               );
    //             })}
    //             <li>
    //               <i
    //                 onClick={toggle}
    //                 className={`my-collapsible__toggle ${
    //                   !range ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
    //                 }`}
    //               ></i>
    //             </li>
    //           </ul>
    //         </div>
    //         <div
    //           className='my-collapsible__content'
    //           ref={setCollapsibleElement}
    //         >
    //           <div>
    //             {isTabletOrMobile ? (
    //               <Row>
    //                 {!data.length ? (
    //                   <p>No Record Found</p>
    //                 ) : (
    //                   data.map((elem, index) => {
    //                     conosole.log(elem, ' elem ');
    //                     return (
    //                       <Col sm={6}>
    //                         <Card
    //                           className='responsiveTableCards mb-4 '
    //                           style={{ width: '100%' }}
    //                         >
    //                           <Card.Body>
    //                             <Card.Title className='mb-3'>
    //                               <div className='d-flex align-items-center'>
    //                                 <Form.Check type='checkbox' label='' />
    //                               </div>
    //                               <div className='tableCardsOptions justify-content-end'>
    //                                 <i
    //                                   className='fa-solid fa-pen'
    //                                   style={{ cursor: 'pointer' }}
    //                                   onClick={() => {
    //                                     setShow(true);
    //                                     setEditData(elem);
    //                                   }}
    //                                 ></i>
    //                                 <TableMenuDropdown
    //                                   hasEditOption={false}
    //                                   deleteHandler={() =>
    //                                     deleteCampaignHandler(elem.campaign_id)
    //                                   }
    //                                 />
    //                               </div>
    //                             </Card.Title>
    //                             <Row>
    //                               {elem.content.map((el, ind) => {
    //                                 return (
    //                                   <Col
    //                                     xs={6}
    //                                     className='tableCardsElements'
    //                                     key={ind}
    //                                   >
    //                                     <strong>CAMPAIGN NAME</strong>
    //                                     <span>{el.campaign_name}</span>
    //                                   </Col>
    //                                 );
    //                               })}
    //                             </Row>
    //                           </Card.Body>
    //                         </Card>
    //                       </Col>
    //                     );
    //                   })
    //                 )}
    //               </Row>
    //             ) : (
    //               <div
    //                 style={{
    //                   height: data.length > 4 ? '300px' : 'inherit'
    //                 }}
    //                 className={data.length > 4 ? 'tableScrollWrap' : ''}
    //               >
    //                 <Table
    //                   className={`${styles.campaignsTable} fulcrumDefaultTable`}
    //                 >
    //                   <tbody>
    //                     {!data.length ? (
    //                       <p>No Record Found</p>
    //                     ) : (
    //                       data.map((elem, index) => {
    //                         return (
    //                           <tr key={index}>
    //                             <td>
    //                               <Form.Check type='checkbox' label='' />
    //                             </td>
    //                             {elem.content.map((el, index) => {
    //                               return (
    //                                 <td>
    //                                   <strong>{el.CampaignName}</strong>

    //                                   <span>{el.CampaignData}</span>
    //                                 </td>
    //                               );
    //                             })}
    //                             <td className={styles.editCol}>
    //                               <i
    //                                 onClick={() => {
    //                                   setShow(true);
    //                                   setEditData(elem);
    //                                 }}
    //                                 className='fa-solid fa-pen'
    //                               ></i>
    //                             </td>
    //                             <td className={styles.optionsCol}>
    //                               <TableMenuDropdown
    //                                 hasEditOption={false}
    //                                 deleteHandler={() =>
    //                                   deleteCampaignHandler(elem.id)
    //                                 }
    //                               />
    //                             </td>
    //                           </tr>
    //                         );
    //                       })
    //                     )}
    //                   </tbody>
    //                 </Table>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   />
    // </>

    <>
      <div>
        {isTabletOrMobile ? (
          <Row>
            {facebookCampaigns.map((elem, index) => {
              return (
                <Col sm={6}>
                  <Card
                    className='responsiveTableCards mb-4 '
                    style={{ width: '100%' }}
                  >
                    <Card.Body>
                      <Card.Title className='mb-3'>
                        <div className='d-flex align-items-center'>
                          <Form.Check type='checkbox' label='' />
                        </div>
                        <div className='tableCardsOptions justify-content-end'>
                          <i
                            className='fa-solid fa-pen'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              //   setShow(true);
                              // setEditData(elem);
                            }}
                          ></i>
                          <TableMenuDropdown
                            hasEditOption={false}
                            deleteHandler={() =>
                              deleteCampaignHandler(elem.campaign_id)
                            }
                          />
                        </div>
                      </Card.Title>
                      <Row>
                        <Col xs={12} className='tableCardsElements'>
                          <strong>CAMPAIGN NAME</strong>
                          <span>{elem.campaign_name}</span>
                        </Col>
                        <Col xs={6} className='tableCardsElements'>
                          <strong>OBJECTIVE</strong>
                          <span>{elem.objective}</span>
                        </Col>
                        <Col xs={6} className='tableCardsElements'>
                          <strong>BUDGET</strong>
                          <span>{elem.budget}</span>
                        </Col>

                        <Col xs={6} className='tableCardsElements'>
                          <strong>STATUS</strong>
                          <span>{elem.status}</span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div
            style={{
              height: facebookCampaigns.length > 4 ? '300px' : 'inherit'
            }}
            className={facebookCampaigns.length > 4 ? 'tableScrollWrap' : ''}
          >
            <Table className={`${styles.campaignsTable} fulcrumDefaultTable`}>
              <tbody>
                {facebookCampaigns.map((elem, index) => {
                  return (
                    <tr key={elem.campaign_id}>
                      <td>
                        <Form.Check type='checkbox' label='' />
                      </td>

                      <td>
                        <strong>CAMPAIGN NAME</strong>
                        <span>{elem.campaign_name}</span>
                      </td>
                      <td>
                        <strong>SEGMENT</strong>
                        <span>N/A</span>
                      </td>
                      <td>
                        <strong>OBJECTIVE</strong>
                        <span>{elem.objective}</span>
                      </td>
                      <td>
                        <strong>BUDGET</strong>
                        <span>{elem.budget}</span>
                      </td>

                      <td>
                        <strong>STATUS</strong>
                        <span>{elem.status}</span>
                      </td>

                      <td className={styles.editCol}>
                        <i
                          onClick={() => {
                            // setShow(true);
                            // setEditData(elem);
                          }}
                          className='fa-solid fa-pen'
                        ></i>
                      </td>
                      {/* <td className={styles.optionsCol}>
                        <TableMenuDropdown
                          hasEditOption={false}
                          // deleteHandler={() => deleteCampaignHandler(elem.id)}
                        />
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

interface FacebookCampaignsTableProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setEditData: any;
}
