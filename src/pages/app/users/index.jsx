import ListTableView from "../../../components/tables/ListTableView";

const Users = () => {
  const apiMockData = [
    {
      name: "Chukwudi Eze",
      email: "Chukwudieze97@gmail.com",
      role: "Administrator",
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
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Date Created",
      accessor: "createdAt",
    },
  ];
  return (
    <ListTableView
      data={apiMockData}
      columns={columns}
      hasDelete
      activeHeader="Full Name"
      onDeleteClick={() => {}}
    />
  );
};

export default Users;
