import { Link } from "react-router-dom";
import { ActionButton } from "../components/ActionButton";
import { IDocument } from "../interfaces/interfaces";
import { routes } from "../routes";
import { useTranslation } from "react-i18next";

const documents: IDocument[] = [
  {
    id: 1,
    title: 'title 1',
    number: 11,
    author: "author 1",
    type: "string",
    content: "string",
    creationDate: "2024-09-04",
    updateDate: "2024-10-04",
  },
  {
    id: 2,
    title: 'title 2',
    number: 22,
    author: "author 2",
    type: "string",
    content: "stringddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    creationDate: "2024-09-04",
    updateDate: "2024-10-04",
  },
];

export const DocumentsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full p-8">
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
          {documents.map((document) => (
            <Link className="border-b overflow-hidden hover:bg-sky-50" to={routes.documentDetailsRoute(document.id)} key={document.id}>
              <td className="py-4 px-5">{document.number}</td>
              <td className="py-4 px-5 truncate">{document.title}</td>
              <td className="py-4 px-5 truncate">{document.author}</td>
              <td className="py-4 px-5">{document.type}</td>
              <td className="py-4 px-5 truncate max-w-0">{document.content}</td>
              <td className="py-4 px-5">{document.creationDate}</td>
              <td className="py-4 px-5">{document.updateDate}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton actionType="edit" />
                <ActionButton actionType="delete" />
              </td>
          </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};