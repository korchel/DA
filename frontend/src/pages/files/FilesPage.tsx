import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import chunk from 'lodash/chunk';
import { useState } from 'react';

import { ButtonComponent, Title } from '../../components/ui';
import { useGetFilesQuery as getFiles } from '../../store/filesApi';
import { routes } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { openModal } from '../../store/modalSlice';
import { Table } from '../../components/Table';
import { Spinner } from '../../components/ui/icons';
import { Pagination } from '../../components/ui/Pagination';
import { QuantityTag } from '../../components/QuantityTag';
import { PageSizeSwitcher } from '../../components/PageSizeSwitcher';

export const FilesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: files, isLoading } = getFiles(currentUser.roles);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const numberOfFiles = files?.length;
  const pages = chunk(files, pageSize);
  const numberOfPages = pages.length || 1;

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

  const tableData = pages[currentPage - 1]?.map((file) => ({
    id: file.id,
    data: {
      name: file.filename,
      type: file.filetype,
      author: file.author,
      creationDate: file.creationDate ? Date.parse(file.creationDate) : 'no data',
      updateDate: file.updateDate ? Date.parse(file.updateDate) : 'no data',
    },
  }));

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

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
        <div className='flex items-center gap-2'>
          <QuantityTag type='files' number={numberOfFiles} />
          <PageSizeSwitcher onChange={setPageSize} value={pageSize} />
        </div>
        <ButtonComponent variant='primary' onClick={handleCreate}>
          {t('files.addFile')}
        </ButtonComponent>
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
      />
      <Pagination
        className='mt-5 ml-auto'
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        goToPage={handleChangePage}
      />
    </>
  );
};
