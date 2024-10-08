import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Title } from '../../components/ui';
import { routes } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { useGetDocsQuery as getDocs } from '../../store/docsApi';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { TableContainer } from '../../components/TableContainer';

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { data: documents, isLoading } = getDocs(currentUser.roles);

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

  const tableData = documents?.map((document) => ({
    id: document.id,
    data: {
      number: document.number,
      name: document.title,
      author: document.author.username,
      type: t(`documents.type.${document.type.type}`),
      content: document.content,
      creationDate: document.creationDate
        ? new Date(document.creationDate)
        : t('documents.noData'),
      updateDate: document.updateDate
        ? new Date(document.updateDate)
        : t('documents.noData'),
    },
  }));

  const handleCreate = () => {
    dispatch(openModal({ type: 'createDocument', open: true }));
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.documentDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('documents.title')}</Title>
      <TableContainer
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        type='documents'
        handleCreate={handleCreate}
        className='mt-4'
      />
    </>
  );
};
