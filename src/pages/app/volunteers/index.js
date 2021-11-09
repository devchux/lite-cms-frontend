import TableView from "../../../components/tables/TableView";
import PageWrapper from "../../../components/wrappers/PageWrapper";

const index = () => {
  const apiMockData = [
    {
      name: "Chukwudi Eze",
      email: "Chukwudieze97@gmail.com",
      message: "Hello World",
      createdAt: "11/09/2021",
    },
  ];

  const columns = [
    {
      Header: "Full Name",
      accessor: "name",
    },
    {
      Header: "Email Address",
      accessor: "email",
    },
    {
      Header: "Date Created",
      accessor: "createdAt",
    },
  ];
  return (
    <PageWrapper>
      <div>
        <TableView
          data={apiMockData}
          columns={columns}
          hasDelete
          activeHeader="Full Name"
          onDeleteClick={() => {}}
        />
      </div>
    </PageWrapper>
  );
};

export default index;
