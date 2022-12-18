import React from 'react';
import { Table } from 'react-bootstrap';
import './TableDate.css';
import FormControl from '@mui/material/FormControl';
import { ExportReactCSV } from '../ExportReactCSV/ExportReactCSV'

const TableDate = (props) => {
  let sum = 0;
  props.results.map(item => { sum = sum + Number(item['Стоимость']) });
  let vacation = sum / 2 * 0.05;
  let salary = (sum - sum * 0.05) / 2;
  return (
    <FormControl fullWidth >
        <div className='bodyDate'>

          <ExportReactCSV
            csvData={
              [...[{ 'Общая сумма': sum, 'Отпускные 5%': vacation, 'Зарплата': salary, 'Адресов': props.results.length }], ...props.results]}
            fileName={`Выгрузка по ${props.Empl.Emp} с ${props.Empl.dateStart} по ${props.Empl.dateEnd}`} />
          <br />
          
          {/* <TableContent/> */}
          <Table striped responsive bordered  hover variant="dark" className="table">
            <thead className='SumTable'>
              <tr>
                <th>Найдено строк</th>
                <th>Итого</th>
                <th>Отпускные 5%</th>
                <th>Зарплата</th>
              </tr>
            </thead>
            <tbody>
              <tr key={1}>
                <td>{props.results.length}</td>
                <td>{new Intl.NumberFormat('ru-RU').format(sum)}</td>
                <td>{new Intl.NumberFormat('ru-RU').format(vacation)}</td>
                <td>{new Intl.NumberFormat('ru-RU').format(salary)}</td>
              </tr>
            </tbody>
          </Table>

          <br />

          <Table striped responsive bordered hover variant="dark" className="table">
            <thead>
              <tr>
                <th>№ заказа</th>
                <th>Адрес</th>
                <th>Время работы</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {props.results.map(item => (
                <tr key={item['№ заказа в магазине']}>
                  <td>{item['№ заказа в магазине']}<br />{item['№ заказа в Руках']}</td>
                  <td>{item['Адрес']}</td>
                  <td>{item['Время работы']}</td>
                  <td>{new Intl.NumberFormat('ru-RU').format(item['Стоимость'])}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </FormControl>
  );
};

export default TableDate;