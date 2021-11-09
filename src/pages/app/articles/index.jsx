import React from 'react'
import TableView from '../../../components/tables/TableView'
import PageWrapper from '../../../components/wrappers/PageWrapper'

const Articles = () => {
  const apiMockData = [
    {
      id: 1,
      title: 'Diary of a faithful wife influenced by love. that is just it',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      author: 'Admin',
      createdAt: '11/3/2021',
      published: true,
    },
    {
      id: 2,
      title: 'How to become a successful businessman',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      author: 'Eze Chukwudi',
      createdAt: '11/3/2021',
      published: true,
    },
    {
      id: 3,
      title: 'Welcome to the metaverse',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      author: 'Eze Chukwudi',
      createdAt: '11/3/2021',
      published: true,
    },
    {
      id: 4,
      title: 'How to build a customer relationship management system in react',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      author: 'Eze Chukwudi',
      createdAt: '11/3/2021',
      published: true,
    },
    {
      id: 5,
      title: 'Getting started in tech: a step by step guide',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      author: 'Eze Chukwudi',
      createdAt: '11/3/2021',
      published: true,
    },
  ]

  const columns = [
    {
      Header: 'S/N',
      accessor: 'id',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: 'Date Created',
      accessor: 'createdAt',
    },
  ] 
  return (
    <PageWrapper>
      <div className="main-">
        <TableView data={apiMockData} columns={columns} activeHeader="Title" hasDelete onDeleteClick={() => {}} />
      </div>
    </PageWrapper>
  )
}

export default Articles
