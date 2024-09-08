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
      <Card.Header>Файл <span className="text-sky-600">{file?.filename}</span></Card.Header>
      <Card.Body >
        <div><span className="font-bold">Название: </span>{file?.filename}</div>
        <div><span className="font-bold">Тип: </span>{file?.filetype}</div>
        <div><span className="font-bold">Автор: </span>{file?.author}</div>
        <img
          src={routes.thumbnailPath(file?.id)}
          alt={file?.filename}
          className="max-h-[100px] max-w-[100px] w-auto h-auto"
        />
        <div><span className="font-bold">Дата создания: </span>{file?.creationDate}</div>
      </Card.Body>
      <Card.Footer>
        <ButtonComponent variant="primary" onClick={handleEdit}>Изменить файл</ButtonComponent>
        <ButtonComponent variant="danger" onClick={handleDelete}>Удалить файл</ButtonComponent>
      </Card.Footer>
    </Card>
  );
};