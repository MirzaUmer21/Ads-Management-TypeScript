import { useAppDispatch, useAppSelector } from 'app/hooks';
import AddBudget from 'components/Budgets/AddBudget';
import BudgetsTable from 'components/Budgets/BudgetsTable';
import EditBudget from 'components/Budgets/EditBudget';
import {
  setInstallBudgetsData,
  setSalesBudgetsData,
  setServiceBudgetsData
} from 'features/budget/budgetSlice';
import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useGetAllBudgetsMutation } from 'services/budgetApi';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import {
  BudgetsSalesTableFilter,
  BudgetsServiceTableFilter
} from 'static/BudgetsTableFilter';

export default function BudgetsContainer() {
  const [show, setShow] = useState(false);
  const [editModelshow, setEditModelShow] = useState(false);
  const [editModelData, setEditModelData] = useState(null);
  const dispatch = useAppDispatch();
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const allBudgets = useAppSelector(state => state.budgets.AllBudgets);
  const serviceBudgets = useAppSelector(state => state.budgets.serviceBudgets);
  const salesBudgets = useAppSelector(state => state.budgets.salesBudgets);
  const installBudgets = useAppSelector(state => state.budgets.installBudgets);

  const id_token: string = useAppSelector(
    state => state.authentication.id_token
  );
  const [GetAllBudgets, GetAllBudgetsResponse] = useGetAllBudgetsMutation();
  const getBudgets = async () => {
    const apiData = {
      id_token: id_token,
      crm_client_name: activeCRMClient ? activeCRMClient.crm_client_name : ''
    };
    try {
      const response: any = await GetAllBudgets(apiData).unwrap();
      if (response) {
        filterBudgets(response);
        // dispatch(setAllBudgetsData({ AllBudgets: response }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const filterBudgets = budgets => {
    const serviceBudgets = budgets.filter(
      budget => budget.segments === 'service'
    );
    const salesBudgets = budgets.filter(budget => budget.segments === 'sales');
    const installBudgets = budgets.filter(
      budget => budget.segments === 'install'
    );
    dispatch(setServiceBudgetsData({ serviceBudgets: serviceBudgets }));
    dispatch(setSalesBudgetsData({ salesBudgets: salesBudgets }));
    dispatch(setInstallBudgetsData({ installBudgets: installBudgets }));
  };
  useEffect(() => {
    if (activeCRMClient === null) {
      toast.warning('Please Select a Client');
    } else {
      getBudgets();
    }
  }, [activeCRMClient]);
  return (
    <>
      <FulcrumCustomModel
        show={show}
        setShow={setShow}
        ComponentForm={<AddBudget />}
      />
      {editModelshow && (
        <FulcrumCustomModel
          show={editModelshow}
          setShow={setEditModelShow}
          ComponentForm={<EditBudget editModelData={editModelData} />}
        />
      )}
      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Budgets',
              NavText:
                'Create target budgets for platforms by business segments',
              hasButton: true,
              buttonText: 'Assign Budget'
            }}
          />
        </Col>
        <Col lg={12}>
          <Container>
            {GetAllBudgetsResponse.isLoading ? (
              <div
                style={{
                  display: 'flex',
                  height: '30px',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <PropagateLoader color='#5600d6' />
              </div>
            ) : (
              <>
                {serviceBudgets && (
                  <BudgetsTable
                    setShow={setShow}
                    BudgetsTableFilters={BudgetsServiceTableFilter}
                    TableData={{
                      heading: 'Service',
                      data: serviceBudgets
                    }}
                    setEditModelShow={setEditModelShow}
                    setEditData={setEditModelData}
                  />
                )}
                {salesBudgets && (
                  <BudgetsTable
                    setShow={setShow}
                    BudgetsTableFilters={BudgetsSalesTableFilter}
                    TableData={{
                      heading: 'Sales',
                      data: salesBudgets
                    }}
                    setEditModelShow={setEditModelShow}
                    setEditData={setEditModelData}
                  />
                )}
                {installBudgets && (
                  <BudgetsTable
                    setShow={setShow}
                    BudgetsTableFilters={BudgetsSalesTableFilter}
                    TableData={{
                      heading: 'Install',
                      data: installBudgets
                    }}
                    setEditModelShow={setEditModelShow}
                    setEditData={setEditModelData}
                  />
                )}
              </>
            )}
          </Container>
        </Col>
      </Container>
    </>
  );
}
