import React, { FC, useMemo } from "react";
import { usePagination, useTable } from "react-table";
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    rows,
    prepareRow,
  } = useTable<Data>(
    {
      columns,
      data,
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;
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
          {page.map((row) => {
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
      </table>
      <div>
        <span>
          Page :
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
          {[10, 25, 50].map((pagesize) => (
            <option value={pagesize} key={pagesize}>
              {pagesize}
            </option>
          ))}
        </select>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? +e.target.value - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <button onClick={gotoPage.bind(null, 0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
        <button
          onClick={gotoPage.bind(null, pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

const PaginationTable = () => {
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

export default PaginationTable;
