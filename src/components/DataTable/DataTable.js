import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import './../../styles/DataTable.css';
import { useAuth } from '../context/AuthContext';

const DataTable = React.memo(({ columns, data, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  const [sortBy, setSortBy] = useState([]);

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
  } = useTable(
    {
      columns: tableColumns,
      data,
      initialState: { sortBy }
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="data-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? <ChevronDown size={14} />
                      : <ChevronUp size={14} />
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default DataTable;