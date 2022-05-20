import React from "react";

interface GlobalFilterProps {
  column: any;
}
const ColumnFilter: React.FC<GlobalFilterProps> = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
