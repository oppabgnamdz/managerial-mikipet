import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from './columnsUsers';
import { COLUMNSPOSTS } from './columsPosts';
import { useSelector } from 'react-redux';
import './table.scss';
import { urlUsers } from '../../constant';
export default function Index() {
  const [data, setData] = useState([]);
  const urlFetch = useSelector((state) => state.goTable);
  const columns = useMemo(() => COLUMNS, []);
  const columnsPosts = useMemo(() => COLUMNSPOSTS, []);
  const compare = urlFetch === urlUsers ? columns : columnsPosts;
  useEffect(() => {
    const fetchDataUser = async () => {
      const response = await axios.get(urlFetch);
      if (!response) return;
      setData(response.data);
    };
    fetchDataUser();
  }, [urlFetch]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: compare,
        data,
      },
      useSortBy
    );
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '70vh',
        position: 'relative',
      }}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
