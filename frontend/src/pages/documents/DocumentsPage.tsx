import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import chunk from 'lodash/chunk';
import { useState } from "react";

import { Title, ButtonComponent } from "../../components/ui";
import { routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { useGetDocsQuery as getDocs } from "../../store/docsApi";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../components/ui/icons";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/ui/Pagination";
import { QuantityTag } from "../../components/QuantityTag";


export const DocumentsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { data: documents, isLoading } = getDocs(currentUser.roles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const numberOfDocuments = documents?.length;
  const pages = chunk(documents, pageSize);
  const numberOfPages = pages.length || 1;

  const tableHeaders = [
    t('documents.tableHeader.number'),
    t('documents.tableHeader.name'),
    t('documents.tableHeader.author'),
    t('documents.tableHeader.type'),
    t('documents.tableHeader.content'),
    t('documents.tableHeader.creationDate'),
    t('documents.tableHeader.updateDate'),
  ];

  const tableData = pages[currentPage - 1]?.map((document) => ({
    id: document.id,
    data: [
      document.number,
      document.title,
      document.author.username,
      t(`documents.type.${document.type.type}`),
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
      <div className="w-full flex justify-between py-2 md:py-5">
        <QuantityTag type="documents" number={numberOfDocuments} />
        <ButtonComponent
          variant="primary"
          onClick={handleCreate}
        >
          {t('documents.createDocument')}
        </ButtonComponent>
      </div>
      <Table
        headers={tableHeaders}
        data={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
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