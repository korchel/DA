import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import chunk from 'lodash/chunk';
import { useState } from "react";

import { routes } from "../../routes";
import { useGetUsersQuery as getUsers} from "../../store/usersApi";
import { Spinner } from "../../components/ui/icons";
import { Title } from "../../components/ui";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/ui/Pagination";

export const UsersPage = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = getUsers();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const pages = chunk(users, pageSize);
  const numberOfPages = pages.length  || 1;

  const tableHeaders = [
    t('users.tableHeader.userName'),
    t('users.tableHeader.name'),
    t('users.tableHeader.lastName'),
    t('users.tableHeader.roles'),
  ];

  const tableData = pages[currentPage]?.map((user) => ({
    id: user.id,
    data: [
      user.username,
      user.name,
      user.lastname,
      user.roles.map((role) => t(`users.roles.${role.name}`)).join(', '),
    ],
  }));

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.userDetailsRoute(id));
  };

  if (isLoading) {
    return (
      <Spinner className="h-[100%]" />
    );
  }

  return (
    <>
      <Title>{t('users.title')}</Title>
      <Table
        headers={tableHeaders}
        data={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        className="mt-4"
      />
      <Pagination
        className="mt-5 ml-auto"
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        goToPage={handleChangePage}
      />
    </>
  );
};