import { ActionButton } from "../components/ActionButton";
import { IDocument } from "../interfaces/interfaces";

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
  return (
    <div className="h-full p-8">
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-cyan-600 whitespace-nowrap">
          <tr className="border-b ">
            <th className="py-4 px-5 w-10">Номер</th>
            <th className="py-4 px-5">Название</th>
            <th className="py-4 px-5">Автор</th>
            <th className="py-4 px-5">Тип</th>
            <th className="py-4 px-5">Содержание</th>
            <th className="py-4 px-5">Дата создания</th>
            <th className="py-4 px-5">Дата обновления</th>
            <th className="py-4 px-5 text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr className="border-b overflow-hidden" key={document.id}>
              <td className="py-4 px-5">{document.number}</td>
              <td className="py-4 px-5 truncate">{document.title}</td>
              <td className="py-4 px-5 truncate">{document.author}</td>
              <td className="py-4 px-5">{document.type}</td>
              <td className="py-4 px-5 truncate max-w-0">{document.content}</td>
              <td className="py-4 px-5">{document.creationDate}</td>
              <td className="py-4 px-5">{document.updateDate}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton action="edit" />
                <ActionButton action="delete" />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};