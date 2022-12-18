import React from 'react'
import Button from '@mui/material/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import './ExportReactCSV.css';


export const ExportReactCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button className='btn' color="success" size="large" variant="contained" onClick={(e) => exportToCSV(csvData,fileName)}>
            <CSVLink className='btn-csv' data={csvData} filename={fileName}>Выгрузить в Exel</CSVLink>
        </Button>
    )
}