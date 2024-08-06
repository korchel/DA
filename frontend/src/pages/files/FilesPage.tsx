import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../../components/ButtonComponent";
import { ActionButton } from "../../components/ActionButton";
import { useGetFilesQuery as getFiles } from "../../store/filesApi";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";


const files = [
  {
    id: 1,
    filename: 'filename1',
    filetype: 'filetype1',
    author: 'author',
    // availableFor: number[],
    publicEntity: true,
    creationDate: "2024-10-04",
    updateDate: "2024-10-04",
  },
  {
    id: 2,
    filename: 'filename2',
    filetype: 'filetype2',
    author: 'author2',
    // availableFor: number[],
    publicEntity: true,
    creationDate: "2024-10-04",
    updateDate: "2024-10-04",
  },
]

export const FilesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const {data: files} = getFiles();

  const handleCreate = () => {

  };

  const handleEdit = (id: number): void => {

  };

  const handleDelete = (id: number): void => {

  };

  return (
    <div className="h-full p-8 flex flex-col">
      <h1 className="text-sky-800 font-bold text-lg text-center">{t('filesPage.title')}</h1>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('filesPage.addFile')}
      </ButtonComponent>
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-sky-600 whitespace-nowrap">
          <tr className="border-b">
            <th className="py-4 px-5 w-10">{t('filesPage.tableHeader.fileName')}</th>
            <th className="py-4 px-5">{t('filesPage.tableHeader.fileType')}</th>
            <th className="py-4 px-5">{t('filesPage.tableHeader.author')}</th>
            <th className="py-4 px-5">Публичный</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.creationDate')}</th>
            <th className="py-4 px-5">{t('documentsPage.tableHeader.updateDate')}</th>
            <th className="py-4 px-5 text-center">{t('documentsPage.tableHeader.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr
              className="border-b overflow-hidden hover:bg-sky-50 cursor-pointer"
              key={file.id}
              onClick={() => navigate(routes.fileDetailsRoute(file.id))}
            >
              <td className="py-4 px-5">{file.filename}</td>
              <td className="py-4 px-5 truncate">{file.filetype}</td>
              <td className="py-4 px-5 truncate">{file.author}</td>
              <td className="py-4 px-5 truncate">{file.publicEntity}</td>
              <td className="py-4 px-5">{file.creationDate ?? 'no data'}</td>
              <td className="py-4 px-5">{file.updateDate ?? 'no data'}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton actionType="edit" onClick={() => handleEdit(file.id)} />
                <ActionButton actionType="delete" onClick={() => handleDelete(file.id)} />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};