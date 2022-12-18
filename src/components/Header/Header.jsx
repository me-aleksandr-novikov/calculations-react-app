import React from 'react';
import Papa from 'papaparse';
import { useState } from "react";
import Button from '@mui/material/Button';
import { Select, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import './Header.css';

const Header = (props) => {
  // State to store parsed data
  const [dateStart, setDateStart] = useState(`${(new Date).getFullYear()}-${(new Date).getMonth()}-${(new Date).getDate()}`);
  const [dateEnd, setDateEnd] = useState(`${(new Date).getFullYear()}-${(new Date).getMonth()+1}-${(new Date).getDate()}`);
  const [uploadDate, setUploadDate] = useState('');
  const [Emp, setSelectedEmp] = useState('ИП Сабуров С.М.');

  const filterDate = () => {
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

        props.updateData(results, Emp, dateStart, dateEnd); //выкидываем наверх

      }
    })
  }

  return (
    <FormControl fullWidth >
      <Paper elevation={3} className='fc' square>
        <>
          {/* File Uploader */}
          <Button className='btn' color="success" variant="outlined" size="large" component="label">
            Загрузить CSV
            <input hidden accept=".csv" multiple type="file" name="file" onChange={(event) => setUploadDate(event.target.files[0])} />
          </Button>
        </>
        <>
          <div className='dateBlock'>
            <TextField
              id="date"
              type="date"
              name='input1'
              value={dateStart}
              color="success"
              // sx={{ width: '49.5%' }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setDateStart(event.target.value)}
            />
            <TextField
              id="date"
              type="date"
              name='input2'
              value={dateEnd}
              color="success"
               //sx={{ width: '200' }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setDateEnd(event.target.value)}
            />
          </div>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="selectEmployees"
            defaultValue="ИП Сабуров С.М."
            color="success"
            onChange={(event) => setSelectedEmp(event.target.value)}
          >
            <MenuItem value="ИП Сабуров С.М.">ИП Сабуров С.М.</MenuItem>
            <MenuItem value="Пыкин Никита" >Пыкин Никита</MenuItem>
            <MenuItem value="Поздняков Иван">Поздняков Иван</MenuItem>
            <MenuItem value="Семенов Владимир">Семенов Владимир</MenuItem>
            <MenuItem value="Колесник Алексей">Колесник Алексей</MenuItem>
            <MenuItem value="Чугунов Анатолий">Чугунов Анатолий</MenuItem>
            <MenuItem value="Коваленко Иван">Коваленко Иван</MenuItem>
          </Select>

          <br />

          <Button
            className='btn'
            variant="contained"
            onClick={filterDate}
            color="success"
            size="large"
          >
            Применить
          </Button>

        </>
      </Paper>
    </FormControl>
  );
};

export default Header;