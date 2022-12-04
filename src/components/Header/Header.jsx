import React from 'react';
import Xlsx from 'xlsx';
import Papa from 'papaparse';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  // State to store parsed data
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [Emp, setSelectedEmp] = useState('ИП Сабуров С.М.');
  

  const filterDate = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(uploadDate, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {

        results = results.data.filter((obj) => {
          return Object.keys(obj).some((key) => {
            return (key === 'Статус' && obj[key] === 'Выполнен');
          }) && (new Date(dateEnd) >= new Date(obj['Время работы']) && new Date(obj['Время работы']) >= new Date(dateStart))
          && (obj['Мастер'] === Emp)
        });
        console.log(results);

      }
    })
  }

  return (
    <div className={'header border border-success'} >
      <div>

        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className='fileIn form-control-lg'
          onChange={(event) => setUploadDate(event.target.files[0])}
          accept=".csv"
          
        />

        <div>
          <div className='dateBlock'>
            <input type="date"
              className="start form-control-lg"
              name='input1'
              value={dateStart}
              onChange={(event) => setDateStart(event.target.value)}
            />

            <input
              type="date"
              className="end form-control-lg"
              name='input2'
              value={dateEnd}
              onChange={(event) => setDateEnd(event.target.value)}
            />
          </div>

          <select
            className="selectEmployees form-control-lg"
            onChange={(event) => setSelectedEmp(event.target.value)}
          >
            <option defaultValue="ИП Сабуров С.М.">ИП Сабуров С.М.</option>
            <option value="Пыкин Никита" >Пыкин Никита</option>
            <option value="Поздняков Иван">Поздняков Иван</option>
            <option value="Семенов Владимир">Семенов Владимир</option>
            <option value="Колесник Алексей">Колесник Алексей</option>
            <option value="Чугунов Анатолий">Чугунов Анатолий</option>
          </select>

          <br />

          <Button
            className='btn'
            variant="success"
            onClick={filterDate}
          >
            Применить
          </Button>{' '}

        </div>
      </div>
    </div >
  );
};

export default Header;