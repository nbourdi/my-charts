import React from 'react';

const ScrollableTable = ({ data, onRowClick }) => {
  return (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Chart Name</th>
            <th>Date Create</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => onRowClick(row)}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
              <td>{row.column4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
