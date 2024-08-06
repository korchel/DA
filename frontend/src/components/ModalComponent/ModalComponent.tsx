import { useDispatch, useSelector } from "react-redux";
import { closeModal, getModalOpen, getModalType } from "../../store/modalSlice";
import { DeleteDocument } from "./document/DeleteDocument";
import { CreateDocument } from "./document/CreateDocument";
import { EditDocument } from "./document/EditDocument";

export const ModalComponent = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(getModalType);
  const open = useSelector(getModalOpen);

  const handleBackDropClick = (event) => {
    if (event.target.closest('[data-id=modal]')) return;
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return open && (
    <div
      onClick={handleBackDropClick}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur overflow-y-auto flex flex-col items-center justify-center"
    >
      <div data-id="modal" className="bg-white rounded-lg p-5 h-fit flex flex-col min-w-[500px]">
        {modalType === "delete" && <DeleteDocument />}
        {modalType === "create" && <CreateDocument />}
        {modalType === "edit" && <EditDocument />}
      </div>
    </div>);
  ;
};