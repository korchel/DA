import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from '../../routes';
import { useGetUsersQuery as getUsers } from '../../store/usersApi';
import { Spinner } from '../../components/ui/icons';
import { Title } from '../../components/ui';
import { Table } from '../../components/Table';
import { QuantityTag } from '../../components/QuantityTag';

export const UsersPage = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = getUsers();
  const navigate = useNavigate();

  const numberOfUsers = users?.length;

  const tableColumns = [
    {
      label: t('users.tableHeader.userName'),
      accessor: 'userName',
      sortable: true,
    },
    {
      label: t('users.tableHeader.name'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('users.tableHeader.lastName'),
      accessor: 'lastName',
      sortable: true,
    },
    {
      label: t('users.tableHeader.roles'),
      accessor: 'roles',
      sortable: false,
    },
  ];

  const tableData = users?.map((user) => ({
    id: user.id,
    data: {
      userName: user.username,
      name: user.name,
      lastName: user.lastname,
      roles: user.roles.map((role) => t(`users.roles.${role.name}`)).join(', '),
    },
  }));

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.userDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('users.title')}</Title>
      <div className='w-full flex justify-between py-2 md:py-5'>
        <QuantityTag type='users' number={numberOfUsers} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        className='mt-4'
      />
    </>
  );
};
