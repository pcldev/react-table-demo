import React, { FC, useMemo } from "react";
import { useBlockLayout, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS, Data, GROUP_COLUMNS } from "./columns";
import { MOCK_DATA } from "./MOCK_DATA";
import "./table.css";
import { Styles } from "./TableStyles";

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
  } = useTable<Data>(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );
  const firstPageRows = rows.slice(0, 10);
  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 1000, height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="footer">
          {footerGroups.map((footerGroup) => (
            <div {...footerGroup.getHeaderGroupProps()} className="tr">
              {footerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="td">
                  {column.render("Footer")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

const StickyTable = () => {
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

export default StickyTable;
