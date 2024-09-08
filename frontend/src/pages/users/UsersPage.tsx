import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { routes } from "../../routes";
import { useGetUsersQuery as getUsers} from "../../store/usersApi";
import { Spinner } from "../../components/ui/icons";
import { PageTitle } from "../../components/ui";
import { Table } from "../../components/Table";

export const UsersPage = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = getUsers();
  const navigate = useNavigate();

  const tableHeaders = [
    t('users.tableHeader.userName'),
    t('users.tableHeader.name'),
    t('users.tableHeader.lastName'),
    t('users.tableHeader.roles'),
  ];

  const tableData = users?.map((user) => ({
    id: user.id,
    data: [
      user.username,
      user.name,
      user.lastname,
      user.roles.map((role) => t(`users.roles.${role.name}`)).join(', '),
    ],
  }));

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
      <PageTitle className="my-5">{t('users.title')}</PageTitle>
      <Table
        type='users'
        headers={tableHeaders}
        data={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
      />
    </>
  );
};