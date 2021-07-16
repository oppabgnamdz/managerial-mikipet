import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { COLUMNS } from './columnsUsers';
import { COLUMNSPOSTS } from './columsPosts';
import { useSelector } from 'react-redux';
import './table.scss';
import { urlUsers } from '../../constant';
import Search from '../Search';
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: compare,
      data,
    },
    useGlobalFilter,
    useSortBy
  );
  const { globalFilter } = state;
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '60vh',
        position: 'relative',
      }}
    >
      <Search filter={globalFilter} setFilter={setGlobalFilter} />
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
