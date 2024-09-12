import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { Pencil, Trash2 } from 'lucide-react';
import './../../styles/DataTable.css';
import { useAuth } from '../context/AuthContext';

const DataTable = React.memo(({ columns, data, onEdit, onDelete }) => {
  const {isAdmin} = useAuth();

  const actionColumn = useMemo(() => ({
    Header: 'Actions',
    Cell: ({ row }) => (
      <div>
        <button onClick={() => onEdit(row.original)} className="action-button edit">
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(row.original)} className="action-button delete">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }), [onEdit, onDelete]);

  const tableColumns = useMemo(() => {
    return isAdmin ? [...columns, actionColumn] : columns;
  }, [columns, actionColumn, isAdmin]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: tableColumns, data });

  return (
    <table {...getTableProps()} className="data-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default DataTable;