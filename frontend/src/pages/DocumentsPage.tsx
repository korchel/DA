import { Link } from "react-router-dom";
import { ActionButton } from "../components/ActionButton";
import { IDocument } from "../interfaces/interfaces";
import { routes } from "../routes";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useGetDocsQuery as getDocs } from "../store/docsApi";
import { ButtonComponent } from "../components/ButtonComponent";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import { Spinner } from "../icons/Spinner";

const documents = [
  {
    id: 1,
    title: 'title 1',
    number: 11,
    author: {
      userName: 'ghj',
    },
    content: "string",
    creationDate: "2024-09-04",
    updateDate: "2024-10-04",
    type: {
      id: 1,
      type: 'note'
    }
  },
  {
    id: 2,
    title: 'title 2',
    number: 22,
    author: {
      userName: 'ghj',
    },
    content: "stringddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    creationDate: "2024-09-04",
    updateDate: "2024-10-04",
    type: {
      id: 1,
      type: 'note'
    }
  },
];

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { data, isLoading } = getDocs(currentUser.roles);
  const dispatch = useDispatch();

  const handleDelete = (id: number): void => {
    dispatch(openModal({ type: "delete", open: true, id }));
  };

  const handleCreate = () => {
    dispatch(openModal({ type: "create", open: true }))
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
      <h1 className="text-sky-800 font-bold text-lg text-center">{t('documentsPage.title')}</h1>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('documentsPage.createDocument')}
      </ButtonComponent>
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-sky-600 whitespace-nowrap">
          <tr className="border-b ">
            <th className="py-4 px-5 w-10">{t('documentsPage.tableHeader.number')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.name')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.author')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.type')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.content')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.creationDate')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.updateDate')}</th>
            <th className="py-4 px-5 text-center">{t('documentsPage.tableHeader.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {documents?.map((document) => (
            <tr className="border-b overflow-hidden hover:bg-sky-50" key={document.id}>
              <td className="py-4 px-5">{document.number}</td>
              <td className="py-4 px-5 truncate">{document.title}</td>
              <td className="py-4 px-5 truncate">{document.author.userName}</td>
              <td className="py-4 px-5">{document.type.type}</td>
              <td className="py-4 px-5 truncate max-w-0">{document.content}</td>
              <td className="py-4 px-5">{document.creationDate ?? 'no data'}</td>
              <td className="py-4 px-5">{document.updateDate ?? 'no data'}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton actionType="edit" />
                <ActionButton actionType="delete" onClick={() => handleDelete(document.id)} />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};