import React, { FC, useMemo } from "react";
import { useFilters, useGlobalFilter, useTable } from "react-table";
import ColumnFilter from "./ColumnFilter";
import { COLUMNS, Data, GROUP_COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import { MOCK_DATA } from "./MOCK_DATA";
import "./table.css";

interface TableProps {
  columns: any;
  data: any;
  defaultColumn: any;
  getRowProps: any;
}

const Table: FC<TableProps> = ({
  columns,
  data,
  defaultColumn,
  getRowProps = (row: any) => ({}),
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable<Data>(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>
                  {col.render("Header")}
                  <div>{col.canFilter ? col.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            console.log(row);
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((col) => (
                <td {...col.getFooterProps()}>{col.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data: Data[] = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  return (
    <Table
      columns={columns}
      data={data}
      defaultColumn={defaultColumn}
      getRowProps={(row: any) => ({
        onClick: () => alert(JSON.stringify(row.values)),
        style: {
          cursor: "pointer",
        },
      })}
    />
  );
};

export default FilteringTable;
