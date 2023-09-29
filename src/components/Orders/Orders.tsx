import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOrder } from '../../interfaces';
import { ordersActions } from '../../redux';
import { orderService } from '../../services';
import { Order } from '../Order';
import { OrderForm } from '../OrderForm';
import './Orders.css';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Orders = () => {
  const {orders} = useAppSelector(state => state.ordersReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
        dispatch(ordersActions.getAllWithPagination())
  }, [dispatch]);
  return (
    <>
      <div className={'Orders_page_management'}>
        <OrderForm setUpdateOrdersSearch={setUpdateOrdersSearch} />
        <button className={'Exel_btn'}>
          <FontAwesomeIcon
            className={'Exel_btn_img'}
            icon={faFileExcel}
            style={{ color: '#ffffff' }}
          />
        </button>
      </div>
      {orders.map((order) => (
        <Order order={order} key={order.id} />
      ))}
    </>
  );
};

export { Orders };
