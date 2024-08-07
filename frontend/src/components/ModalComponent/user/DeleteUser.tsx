import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../../ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { routes } from "../../../routes";
import { useDeleteUserMutation } from "../../../store/usersApi";

export const DeleteUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(getCurrentDataId);
  const [deleteUser] = useDeleteUserMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteUser(id);
    dispatch(closeModal());
    navigate(routes.usersRoute());
  };
  return (
    <>
      <div className="mb-4 font-bold">{t('modal.deleteUser.areYouSure')}</div>
      <div className="flex justify-between gap-4">
        <ButtonComponent
          variant="outline"
          onClick={handleClose}
        >
          {t('modal.cancel')}
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          onClick={handleDelete}
        >
          {t('modal.delete')}
        </ButtonComponent>
      </div>
    </>
  )
};