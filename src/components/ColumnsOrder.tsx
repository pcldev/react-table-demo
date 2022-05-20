import React, { FC, useMemo } from "react";
import { useTable, useColumnOrder } from "react-table";
import { COLUMNS, Data, GROUP_COLUMNS } from "./columns";
import { MOCK_DATA } from "./MOCK_DATA";
import "./table.css";

interface TableProps {
  columns: any;
  data: any;
  getRowProps: any;
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
    setColumnOrder,
  } = useTable<Data>(
    {
      columns,
      data,
    },
    useColumnOrder
  );

  const changeOrder = () => {
    setColumnOrder([
      "id",
      "first_name",
      "last_name",
      "phone",
      "country",
      "date_of_birth",
    ]);
  };

  return (
    <>
      <button onClick={changeOrder}>Change column order</button>
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

const ColumnOrder = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data: Data[] = useMemo(() => MOCK_DATA, []);
  return (
    <Table
      columns={columns}
      data={data}
      getRowProps={(row: any) => ({
        onClick: () => alert(JSON.stringify(row.values)),
        style: {
          cursor: "pointer",
        },
      })}
    />
  );
};

export default ColumnOrder;
