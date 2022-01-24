import { useTable } from "react-table";
import { Button, Input, Table } from "reactstrap";
import { useNavigation } from "../../hooks/useNavigation";
import "./scss/tableView.scss";

const TableView = ({
  data,
  columns,
  activeHeader,
  modalToggle,
  selectedRows,
  setSelectedRows,
  setDeleteId,
  loading,
  noEdit,
}) => {
  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({
      data,
      columns,
    });

  const { currentUrl, goTo } = useNavigation();

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
      const getRowIds = rows.map((row) => row.original.id);
      setSelectedRows([...getRowIds]);
    }
    return;
  };

  const formatDate = (cell) => {
    const date = new Date(cell);

    return date.toLocaleString();
  };

  const onDelete = (id) => {
    setDeleteId(id);
    modalToggle();
  };
  const formatStatus = (status) => {
    console.log(status);
    if (status) return "Published";
    return "Not Published";
  };

  return (
    <Table {...getTableProps()} className="table-view">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>
              <Input
                type="checkbox"
                checked={
                  rows.length === 1 && selectedRows.length === 1
                    ? rows[0].original.id === selectedRows[0]
                    : rows.length === selectedRows.length
                }
                onChange={() => handleCheckAllRows(rows)}
              />
            </th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th>Delete</th>
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
                  onChange={() => handleRowCheck(row.original)}
                  checked={selectedRows.includes(row.original.id)}
                />
              </td>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  onClick={
                    noEdit
                      ? () => {}
                      : () => goTo(`${currentUrl}/add/${row.original.id}`)
                  }
                  className={
                    cell.column.Header === activeHeader ? "title-cell" : ""
                  }
                >
                  {["date created", "date updated"].includes(
                    cell.column.Header.toLowerCase()
                  )
                    ? formatDate(cell.value)
                    : cell.column.Header.toLowerCase() === "status"
                    ? formatStatus(cell.value)
                    : cell.value
                    ? cell.render("Cell")
                    : "Not available"}
                </td>
              ))}
              <td>
                <Button
                  color="danger"
                  disabled={loading}
                  onClick={() => !loading && onDelete(row.original.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableView;
