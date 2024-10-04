import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import chunk from 'lodash/chunk';
import { useState } from 'react';

import { Title, ButtonComponent } from '../../components/ui';
import { routes } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { useGetDocsQuery as getDocs } from '../../store/docsApi';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/ui/Pagination';
import { QuantityTag } from '../../components/QuantityTag';
import { PageSizeSwitcher } from '../../components/PageSizeSwitcher';

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { data: documents, isLoading } = getDocs(currentUser.roles);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const numberOfDocuments = documents?.length;
  const pages = chunk(documents, pageSize);
  const numberOfPages = pages.length || 1;

  const tableColumns = [
    {
      label: t('documents.tableHeader.number'),
      accessor: 'number',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.name'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.author'),
      accessor: 'author',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.type'),
      accessor: 'type',
      sortable: false,
    },
    {
      label: t('documents.tableHeader.content'),
      accessor: 'content',
      sortable: false,
    },
    {
      label: t('documents.tableHeader.creationDate'),
      accessor: 'creationDate',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.updateDate'),
      accessor: 'updateDate',
      sortable: true,
    },
  ];

  const tableData = pages[currentPage - 1]?.map((document) => ({
    id: document.id,
    data: [
      document.number,
      document.title,
      document.author.username,
      t(`documents.type.${document.type.type}`),
      document.content,
      document.creationDate
        ? new Date(document.creationDate)
        : t('documents.noData'),
      document.updateDate
        ? new Date(document.updateDate)
        : t('documents.noData'),
    ],
  }));

  const handleCreate = () => {
    dispatch(openModal({ type: 'createDocument', open: true }));
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.documentDetailsRoute(id));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('documents.title')}</Title>
      <div className='w-full flex justify-between py-2 md:py-5 flex-wrap gap-2'>
        <div className='flex items-center gap-2'>
          <QuantityTag type='documents' number={numberOfDocuments} />
          <PageSizeSwitcher onChange={setPageSize} value={pageSize} />
        </div>
        <ButtonComponent variant='primary' onClick={handleCreate}>
          {t('documents.createDocument')}
        </ButtonComponent>
      </div>
      <Table
        tableColumns={tableColumns}
        data={tableData}
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
