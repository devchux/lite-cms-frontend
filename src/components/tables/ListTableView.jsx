import { Button } from "reactstrap";
import TableView from "../tables/TableView";
import PageWrapper from "../wrappers/PageWrapper";

const ListTableView = ({ data, columns, activeHeader }) => {
  return (
    <div className="list-table-view">
      <div className="list-table-header d-flex gap-2 my-3">
        <select>
          <option>Delete</option>
        </select>
        <Button color="primary">Apply</Button>
      </div>
      <PageWrapper className="rounded">
        <div className="overflow-auto">
          <TableView
            data={data}
            columns={columns}
            activeHeader={activeHeader}
          />
        </div>
      </PageWrapper>
    </div>
  );
};

export default ListTableView;
