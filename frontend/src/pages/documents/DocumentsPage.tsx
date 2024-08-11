import { Link, useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/ActionButton";
import { IDocument } from "../../interfaces/interfaces";
import { routes } from "../../routes";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useGetDocsQuery as getDocs } from "../../store/docsApi";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../icons/Spinner";

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { data: documents, isLoading } = getDocs(currentUser.roles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id: number): void => {
    dispatch(openModal({ type: "delete", open: true, id }));
  };

  const handleCreate = () => {
    dispatch(openModal({ type: "createDocument", open: true }))
  };

  const handleEdit = (id: number): void => {
    dispatch(openModal({ type: "edit", open: true, id }));
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="h-full p-8 flex flex-col">
      <h1 className="text-sky-800 font-bold text-lg text-center">{t('documents.title')}</h1>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('documents.createDocument')}
      </ButtonComponent>
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-sky-600 whitespace-nowrap">
          <tr className="border-b">
            <th className="py-4 px-5 w-10">{t('documents.tableHeader.number')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.name')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.author')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.type')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.content')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.creationDate')}</th>
            <th className="py-4 px-5">{t('documents.tableHeader.updateDate')}</th>
            <th className="py-4 px-5 text-center">{t('documents.tableHeader.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {documents?.map((document) => (
            <tr
              className="border-b overflow-hidden hover:bg-sky-50 cursor-pointer"
              key={document.id}
              onClick={() => navigate(routes.documentDetailsRoute(document.id))}
            >
              <td className="py-4 px-5">{document.number}</td>
              <td className="py-4 px-5 truncate">{document.title}</td>
              <td className="py-4 px-5 truncate">{document.author.lastname}</td>
              <td className="py-4 px-5">{document.type.type}</td>
              <td className="py-4 px-5 truncate max-w-0">{document.content}</td>
              <td className="py-4 px-5">{document.creationDate ?? t('documents.noData')}</td>
              <td className="py-4 px-5">{document.updateDate ?? t('documents.noData')}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton actionType="edit" />
                <ActionButton actionType="delete" />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};