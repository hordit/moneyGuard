import { useEffect } from 'react';
import { selectorTransactions } from 'redux/transactionsRedux/transactionsSelectors';
import { HomeStyled } from './Home.styled';
import Modal from '../../components/Modal/Modal';
import AddTransaction from '../../components/Add/Add';
import EditTransaction from '../../components/Edit/Edit';
import { getModalState } from 'redux/transactions/selectors';
import {
  toggleAddModal,
  toggleEditModal,
} from 'redux/modal/ModalSlice';
import { getModalTypeState } from 'redux/modal/selectors';

export const Home = () => {
  const { useDispatch, useSelector } = require('react-redux');
  const {
    fetchTransactions,
    deleteItem,
  } = require('redux/transactionsRedux/transactionsOperations');
  const dispatch = useDispatch();
  
  const modalType = useSelector(getModalTypeState);
  const isModalOpen = useSelector(getModalState);

  const deleteTransactions = id => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, fetchTransactions]);

  const transactions = useSelector(selectorTransactions);
  console.log(transactions);

  return (
    <HomeStyled>
      <ul className="header">
        <li>CreatedAt</li>
        <li>Type</li>
        <li>Category</li>
        <li>Comment</li>
        <li>Sum</li>
        <li></li>
      </ul>

      <ul className="transaction">
        {transactions.map(
          ({ createdAt, type, category, comment, value, _id }) => {
            return (
              <li key={_id} className="data">
                <p>{createdAt}</p>
                <p>{type}</p>
                <p>{category}</p>
                <p>{comment}</p>
                <p>{value}</p>
                <p className='editItem' onClick={() => dispatch(toggleEditModal())}>edit</p>
                <button onClick={() => {deleteTransactions(_id)}}>
                  Delete
                </button>
              </li>
            );
          }
        )}
      </ul>

      {/* <div>Кнопки пагинации Prev - Next</div> */}
      <button className='deleteItem' type="button" onClick={() => dispatch(toggleAddModal())}>+</button>
        {modalType === 'modal/toggleAddModal' && isModalOpen && (
          <Modal children={AddTransaction()} />
        )}
        {modalType === 'modal/toggleEditModal' && isModalOpen && (
          <Modal children={EditTransaction()} />
        )}
    </HomeStyled>
  );
};
