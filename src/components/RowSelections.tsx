import React, { FC, useMemo } from "react";
import { useRowSelect, useTable } from "react-table";
import IndeterminateCheckbox from "./CheckBox";
import { COLUMNS, Data, GROUP_COLUMNS } from "./columns";
import { MOCK_DATA } from "./MOCK_DATA";
import "./table.css";

interface TableProps {
  columns: any;
  data: any;
  getRowProps?: any;
}

const Table: FC<TableProps> = ({
  columns,
  data,
  getRowProps = (row: any) => ({}),
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable<Data>(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <IndeterminateCheckbox
                name={""}
                {...getToggleAllRowsSelectedProps()}
              />
            ),
            Cell: ({ row }: { row: any }) => (
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
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
        <pre>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </pre>
      </table>
    </>
  );
};

const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data: Data[] = useMemo(() => MOCK_DATA, []);
  return <Table columns={columns} data={data} />;
};

export default RowSelection;
