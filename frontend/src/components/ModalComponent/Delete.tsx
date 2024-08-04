import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../ButtonComponent";
import { closeModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";

export const Delete = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <>
      <div className="mb-4 font-bold">{t('modal.delete.areYouSure')}</div>
      <div className="flex justify-between gap-4">
        <ButtonComponent variant="outline" onClick={handleClose}>{t('modal.delete.cancel')}</ButtonComponent>
        <ButtonComponent variant="danger">{t('modal.delete.delete')}</ButtonComponent>
      </div>
    </>
  );
};