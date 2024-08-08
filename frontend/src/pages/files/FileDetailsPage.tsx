import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFileQuery as getFile } from "../../store/filesApi";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../icons/Spinner";
import { Card } from "../../components/ui";
import { ButtonComponent } from "../../components/ButtonComponent";

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
      <div className="h-full p-8 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full p-8 flex flex-col items-center ">
      <Card>
        <Card.Header>Детали файла<span className="text-sky-600">{file.username}</span></Card.Header>
        <Card.Body>
          <div><span className="font-bold">Название</span>{file.filename}</div>
          <div><span className="font-bold">Тип</span>{file.filetype}</div>
          <div><span className="font-bold">Автор</span>{file.author}</div>
          <div><span className="font-bold">Миниатюра</span></div>
          <div><span className="font-bold">Геометка</span></div>
          <div><span className="font-bold">Дата создания</span></div>
        </Card.Body>
        <Card.Footer>
          <ButtonComponent variant="primary" onClick={handleEdit}>Изменить файл</ButtonComponent>
          <ButtonComponent variant="danger" onClick={handleDelete}>Удалить файл</ButtonComponent>
        </Card.Footer>
      </Card>
    </div>
  );
};