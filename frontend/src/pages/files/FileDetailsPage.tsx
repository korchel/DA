import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetFileQuery as getFile } from "../../store/filesApi";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../components/ui/icons";
import { Card, ButtonComponent } from "../../components/ui";
import { routes } from "../../routes";

export const FileDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {data: file, isLoading} = getFile(id);

  const handleDelete = () => {
    dispatch(openModal({ type: "deleteFile", open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: "editFile", open: true, id }));
  };

  if (isLoading) {
    return (
      <Spinner className="h-[100%]" />
    );
  }

  return (
    <Card>
      <Card.Header>{t('files.detailsPage.title')}<span className="text-highlight">{file?.filename}</span></Card.Header>
      <Card.Body >
        <div><span className="font-bold">{t('files.detailsPage.name')}</span>{file?.filename}</div>
        <div><span className="font-bold">{t('files.detailsPage.type')}</span>{file?.filetype}</div>
        <div><span className="font-bold">{t('files.detailsPage.author')}</span>{file?.author}</div>
        <img
          src={routes.thumbnailPath(file?.id)}
          alt={file?.filename}
          className="max-h-[100px] max-w-[100px] w-auto h-auto"
        />
        <div><span className="font-bold">{t('files.detailsPage.creationDate')}</span>{file?.creationDate}</div>
      </Card.Body>
      <Card.Footer>
        <ButtonComponent variant="primary" onClick={handleEdit}>{t('files.detailsPage.edit')}</ButtonComponent>
        <ButtonComponent variant="danger" onClick={handleDelete}>{t('files.detailsPage.delete')}</ButtonComponent>
      </Card.Footer>
    </Card>
  );
};