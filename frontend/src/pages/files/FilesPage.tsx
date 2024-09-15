import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ButtonComponent, Title } from "../../components/ui";
import { useGetFilesQuery as getFiles } from "../../store/filesApi";
import { routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { openModal } from "../../store/modalSlice";
import { Table } from "../../components/Table";
import { Spinner } from "../../components/ui/icons";

export const FilesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: files, isLoading } = getFiles(currentUser.roles);

  const tableHeaders = [
    t('files.tableHeader.fileName'),
    t('files.tableHeader.fileType'),
    t('files.tableHeader.author'),
    t('files.tableHeader.creationDate'),
    t('files.tableHeader.updateDate'),
  ];

  const tableData = files?.map((file) => ({
    id: file.id,
    data: [
      file.filename,
      file.filetype,
      file.author,
      file.creationDate ?? 'no data',
      file.updateDate ?? 'no data',
    ],
  }));

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
    </>
  );
};