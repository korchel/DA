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
    t('files.tableHeader.actions'),
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

  const handleDownload = (event, id: number): void => {
    event.stopPropagation();
    window.open(routes.fileDownloadPath(id), '_blank');
  };

  const handleOverview = (event, id: number) => {
    event.stopPropagation();
    window.open(routes.viewFilePath(id), '_blank');
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
        type='files'
        headers={tableHeaders}
        data={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
      />
      {/* <img
        src={routes.thumbnailPath(file.id)}
        alt={file.filename}
        className="max-h-[100px] max-w-[100px] w-auto h-auto block"
      />
      <td className="py-4 px-5 flex justify-around">
        <ActionButton actionType="download" title={t('download')} onClick={(event) => handleDownload(event, file.id)} />
        <ActionButton actionType="overview" title={t('see')} onClick={(event) => handleOverview(event, file.id)} />
      </td> */}
    </>
  );
};