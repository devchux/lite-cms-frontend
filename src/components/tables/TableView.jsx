import { useState } from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import { Button, Input, Table } from "reactstrap";
import "./scss/tableView.scss";

const TableView = ({
  data,
  hasDelete,
  onDeleteClick,
  onRowClick,
  columns,
  activeHeader,
}) => {
  const dataRows = useMemo(() => data, []);

  const dataColumns = useMemo(() => columns, []);

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({
      data: dataRows,
      columns: dataColumns,
    });

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowCheck = (row) => {
    if (selectedRows.includes(row.id)) {
      const newSelectedRows = selectedRows.filter(
        (eachRowId) => eachRowId !== row.id
      );
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([...selectedRows, row.id]);
    return;
  };

  const handleCheckAllRows = (rows) => {
    if (rows.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      const getRowIds = rows.map((row) => row.id);
      setSelectedRows([...getRowIds]);
    }
    return;
  };

  return (
    <Table {...getTableProps()} className="table-view">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>
              <Input
                type="checkbox"
                checked={rows.length === selectedRows.length}
                onChange={() => handleCheckAllRows(rows)}
              />
            </th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            {hasDelete && <th>Delete</th>}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="table-data-row">
              <td>
                <Input
                  type="checkbox"
                  onChange={() => handleRowCheck(row)}
                  checked={selectedRows.includes(row.id)}
                />
              </td>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  onClick={() => console.log(cell)}
                  className={
                    cell.column.Header === activeHeader ? "title-cell" : ""
                  }
                >
                  {cell.render("Cell")}
                </td>
              ))}
              {hasDelete && (
                <td>
                  <Button color="danger" onClick={onDeleteClick}>
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableView;
