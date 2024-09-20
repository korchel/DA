import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import chunk from 'lodash/chunk';
import { useState } from "react";

import { ButtonComponent, Title } from "../../components/ui";
import { useGetFilesQuery as getFiles } from "../../store/filesApi";
import { routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { openModal } from "../../store/modalSlice";
import { Table } from "../../components/Table";
import { Spinner } from "../../components/ui/icons";
import { Pagination } from "../../components/ui/Pagination";

export const FilesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: files, isLoading } = getFiles(currentUser.roles);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const pages = chunk(files, pageSize);
  const numberOfPages = pages.length || 1;

  const tableHeaders = [
    t('files.tableHeader.fileName'),
    t('files.tableHeader.fileType'),
    t('files.tableHeader.author'),
    t('files.tableHeader.creationDate'),
    t('files.tableHeader.updateDate'),
  ];

  const tableData = pages[currentPage]?.map((file) => ({
    id: file.id,
    data: [
      file.filename,
      file.filetype,
      file.author,
      file.creationDate ?? 'no data',
      file.updateDate ?? 'no data',
    ],
  }));

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreate = () => {
    dispatch(openModal({ type: "uploadFile", open: true }))
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.fileDetailsRoute(id));
  };

  if (isLoading) {
    return (
      <Spinner className="h-[100%]" />
    );
  }

  return (
    <>
      <Title>{t('files.title')}</Title>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('files.addFile')}
      </ButtonComponent>
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