import React from 'react';
import { Button } from 'react-bootstrap';

const TableDate = (props) => {
    return (
        <div>
            <div className='bodyDate'>
        <Button
          className='btn'
          variant="success"
        //onClick={saveXLS}
        >
          Скачать Exel
        </Button>{' '}

        <br />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {props.results.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default TableDate;