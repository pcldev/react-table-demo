import React from "react";
import "./App.css";
import BasicTable from "./components/BasicTable";
import ColumnHiding from "./components/ColumHiding";
import ColumnOrder from "./components/ColumnsOrder";
import FilteringTable from "./components/FilteringTable";
import GlobalFilter from "./components/GlobalFilter";
import PaginationTable from "./components/PaginationTable";
import RowSelection from "./components/RowSelections";
import SortingTable from "./components/SortingTable";
import StickyTable from "./components/StickyTable";

function App() {
  return <StickyTable />;
}

export default App;
