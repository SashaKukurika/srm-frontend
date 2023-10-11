import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joiResolver } from '@hookform/resolvers/joi';

import { CourseFormatEnum, CoursesEnum, CourseStatusEnum, CourseTypeEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { groupActions } from '../../redux';
import { orderValidator } from '../../validators';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

import './OrderForm.css';

interface IProps {
  setParams: (e: any) => void;
}

const OrderForm: FC<IProps> = ({ setParams }) => {
  const { register, reset } = useForm<IOrder>({
    mode: 'all',
    resolver: joiResolver(orderValidator),
  });
  const [query] = useSearchParams();

  const { groups } = useAppSelector((state) => state.groupReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(groupActions.getAll());
  }, [dispatch]);
  // const search: SubmitHandler<IOrder> = async (orderSearch) => {
  //   // await setUpdateOrdersSearch(orderSearch);
  //   console.log(orderSearch);
  // };

  const resetForm = () => {
    reset();
    setParams({ target: { name: 'reset', value: 'reset' } });
  };

  return (
    <form className={'Filter_orders'} onChange={setParams}>
      <div className={'Filter_orders_inputs'}>
        <div className={'Filter_orders_input'}>
          {/* todo send value from query*/}
          <FormInput
            type="text"
            label={'Name'}
            name={'name'}
            register={register}
            value={query.get('name') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type={'text'}
            label={'Surname'}
            name={'surname'}
            register={register}
            value={query.get('surname') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type={'text'}
            label={'Email'}
            name={'email'}
            register={register}
            value={query.get('email') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type={'text'}
            label={'Phone'}
            name={'phone'}
            register={register}
            value={query.get('phone') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type={'number'}
            label={'Age'}
            name={'age'}
            register={register}
            value={query.get('age') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormSelect
            label={'Course'}
            name={'course'}
            register={register}
            options={Object.values(CoursesEnum)}
            defaultLabel={'all courses'}
            value={query.get('course') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormSelect
            label={'Course format'}
            name={'course_format'}
            register={register}
            options={Object.values(CourseFormatEnum)}
            defaultLabel={'all formats'}
            value={query.get('course_format') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormSelect
            label={'Course type'}
            name={'course_type'}
            register={register}
            options={Object.values(CourseTypeEnum)}
            defaultLabel={'all types'}
            value={query.get('course_type') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormSelect
            label={'Status'}
            name={'status'}
            register={register}
            options={Object.values(CourseStatusEnum)}
            defaultLabel={'all statuses'}
            value={query.get('status') || ''}
          />
        </div>
        {/* todo add group from api*/}
        <div className={'Filter_orders_input'}>
          <FormSelect
            label={'Group'}
            name={'group'}
            register={register}
            options={groups.map((group) => group)}
            defaultLabel={'all groups'}
            value={query.get('group') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type="text"
            label={'Start date'}
            name={'start_date'}
            register={register}
            onFocus={(e: any) => (e.target.type = 'date')}
            value={query.get('start_date') || ''}
          />
        </div>

        <div className={'Filter_orders_input'}>
          <FormInput
            type="text"
            label={'End date'}
            name={'end_date'}
            register={register}
            onFocus={(e: any) => {
              e.target.type = 'date';
            }}
            value={query.get('end_date') || ''}
          />
        </div>
      </div>

      {/* todo add Filter_orders_checkbox_button*/}
      <div className={'Filter_orders_checkbox_button'}>
        <label>
          {/* todo change register for manager*/}
          <input
            className={'Filter_orders_checkbox'}
            name={'manager'}
            type={'checkbox'}
            value={''}
            onClick={(e: any) =>
              e.target.checked
                ? (e.target.value = 'adminProfile.profile.name')
                : (e.target.value = '')
            }
          />
          My
        </label>
        <button className={'Filter_orders_button'} type={'reset'} onClick={resetForm}>
          <FontAwesomeIcon
            className={'Filter_orders_button_img'}
            icon={faRotateRight}
            style={{ color: '#ffffff' }}
          />
        </button>
      </div>
    </form>
  );
};

export { OrderForm };
