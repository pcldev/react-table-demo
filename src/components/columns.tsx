import { Column, CellProps } from "react-table";
import { format } from "date-fns";
import React, { ReactFragment } from "react";
import ColumnFilter from "./ColumnFilter";
export interface Col {
  Header: string;
  accessor: string;
  Footer: string;
  colums?: { Header: string; accessor?: string; Footer: string }[];
  Cell?: any;
  Filter?: any;
}

export interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: string;
}
export const COLUMNS: Column<Data>[] = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: (value: any) => {
      const original = value.cell.row.original;
      return (
        <>
          <h2>Hey</h2>
          <span>{format(new Date(original.date_of_birth), "dd/MM/yyyy")}</span>
        </>
      );
    },
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
];

export const GROUP_COLUMNS: Column<Data>[] = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
