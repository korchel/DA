import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import chunk from 'lodash.chunk';

import { Title, ButtonComponent } from "../../components/ui";
import { routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { useGetDocsQuery as getDocs } from "../../store/docsApi";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../components/ui/icons";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/ui/Pagination";
import { useState } from "react";

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { data: documents, isLoading } = getDocs(currentUser.roles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const chunks = chunk(documents, pageSize);
  console.log(chunks)


  const tableHeaders = [
    t('documents.tableHeader.number'),
    t('documents.tableHeader.name'),
    t('documents.tableHeader.author'),
    t('documents.tableHeader.type'),
    t('documents.tableHeader.content'),
    t('documents.tableHeader.creationDate'),
    t('documents.tableHeader.updateDate'),
  ];

  const tableData = documents?.map((document) => ({
    id: document.id,
    data: [
      document.number,
      document.title,
      document.author.username,
      document.type.type,
      document.content,
      document.creationDate ?? t('documents.noData'),
      document.updateDate ?? t('documents.noData'),
    ],
  }));

  const handleCreate = () => {
    dispatch(openModal({ type: "createDocument", open: true }))
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.documentDetailsRoute(id));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Spinner className="h-full" />
    );
  }
  return (
    <>
      <Title>{t('documents.title')}</Title>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('documents.createDocument')}
      </ButtonComponent>
      <Table
        headers={tableHeaders}
        data={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
      />
      <Pagination
        className="mt-5 ml-auto"
        numberOfPages={10}
        currentPage={currentPage}
        goToPage={handleChangePage}
      />
    </>
  );
};