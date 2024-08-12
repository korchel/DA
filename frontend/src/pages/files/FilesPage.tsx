import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../../components/ui/ButtonComponent";
import { ActionButton } from "../../components/ui/ActionButton";
import { useGetFilesQuery as getFiles } from "../../store/filesApi";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";

export const FilesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: files } = getFiles(currentUser.roles);

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


  return (
    <div className="h-full p-8 flex flex-col">
      <h1 className="text-sky-600 font-bold text-lg text-center">{t('files.title')}</h1>
      <ButtonComponent
        variant="primary"
        className="my-5 ml-auto"
        onClick={handleCreate}
      >
        {t('files.addFile')}
      </ButtonComponent>
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-sky-600 whitespace-nowrap">
          <tr className="border-b">
            <th className="py-4 px-5 w-10">{t('files.tableHeader.fileName')}</th>
            <th className="py-4 px-5">{t('files.tableHeader.fileType')}</th>
            <th className="py-4 px-5">{t('files.tableHeader.author')}</th>
            <th className="py-4 px-5">Миниматюра</th>
            <th className="py-4 px-5">{t('files.tableHeader.creationDate')}</th>
            <th className="py-4 px-5">{t('files.tableHeader.updateDate')}</th>
            <th className="py-4 px-5 text-center">{t('files.tableHeader.actions')}</th>
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
              <td className="py-4 px-5 truncate">
                <img
                  src={routes.thumbnailPath(file.id)}
                  alt={file.filename}
                  className="max-h-[100px] max-w-[100px] w-auto h-auto block"
                />
              </td>
              <td className="py-4 px-5">{file.creationDate ?? 'no data'}</td>
              <td className="py-4 px-5">{file.updateDate ?? 'no data'}</td>
              <td className="py-4 px-5 flex justify-around">
                <ActionButton actionType="download" title={t('download')} onClick={(event) => handleDownload(event, file.id)} />
                <ActionButton actionType="overview" title={t('see')} onClick={(event) => handleOverview(event, file.id)} />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};