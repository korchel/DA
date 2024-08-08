import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
  const [deleteUser, { isError }] = useDeleteUserMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteUser(id); // user is not deleted
    if (isError) {
      toast.error(t('modal.deleteUser.toast.error'));  // isError not working
    } else {
      toast.success(t('modal.deleteUser.toast.success'));
    }
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