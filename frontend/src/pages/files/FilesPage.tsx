import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent, Title } from '../../components/ui';
import { useGetFilesQuery as getFiles } from '../../store/filesApi';
import { routes } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { openModal } from '../../store/modalSlice';
import { Table } from '../../components/Table';
import { Spinner } from '../../components/ui/icons';
import { QuantityTag } from '../../components/QuantityTag';

export const FilesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: files, isLoading } = getFiles(currentUser.roles);

  const numberOfFiles = files?.length;

  const tableColumns = [
    {
      label: t('files.tableHeader.fileName'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('files.tableHeader.author'),
      accessor: 'author',
      sortable: true,
    },
    {
      label: t('files.tableHeader.fileType'),
      accessor: 'type',
      sortable: false,
    },
    {
      label: t('files.tableHeader.creationDate'),
      accessor: 'creationDate',
      sortable: true,
    },
    {
      label: t('files.tableHeader.updateDate'),
      accessor: 'updateDate',
      sortable: true,
    },
  ];

  const tableData = files?.map((file) => ({
    id: file.id,
    data: {
      name: file.filename,
      type: file.filetype,
      author: file.author,
      creationDate: file.creationDate
        ? Date.parse(file.creationDate)
        : 'no data',
      updateDate: file.updateDate ? Date.parse(file.updateDate) : 'no data',
    },
  }));

  const handleCreate = () => {
    dispatch(openModal({ type: 'uploadFile', open: true }));
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.fileDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('files.title')}</Title>
      <div className='w-full flex justify-between py-2 md:py-5'>
        <QuantityTag type='files' number={numberOfFiles} />
        <ButtonComponent variant='primary' onClick={handleCreate}>
          {t('files.addFile')}
        </ButtonComponent>
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
      />
    </>
  );
};
