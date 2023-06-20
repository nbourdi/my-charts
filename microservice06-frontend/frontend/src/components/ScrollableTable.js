import React from 'react';

const ScrollableTable = ({ data, onRowClick, onSort, sortConfig }) => {
  const handleSort = (key) => {
    if (onSort) {
      onSort(key);
    }
  };

  return (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('column1')}>
              Type {sortConfig.key === 'column1' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('column2')}>
              Chart Name {sortConfig.key === 'column2' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('column3')}>
              Date Create {sortConfig.key === 'column3' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
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
