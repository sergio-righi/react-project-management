import { Modal } from "components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "utils";
import { EnumModalType } from "utils/enums";

export const Popup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState<string>("");

  function handleModalClose() {
    // if (searchParams.has("previous")) {
    //   searchParams.delete("id");
    //   searchParams.set("modal", searchParams.get("previous") || "");
    //   searchParams.delete("previous");
    // } else {
    //   searchParams.delete("id");
    //   searchParams.delete("modal");
    //   searchParams.delete("ref_id");
    // }

    switch (searchParams.get("previous")) {
      case EnumModalType.ComponentForm:
        navigate(
          Routes.pages.component.form(
            searchParams.get("ref_id") || "",
            searchParams.get("id") || ""
          )
        );
        break;
      case EnumModalType.ComponentList:
        navigate(Routes.pages.component.list(searchParams.get("ref_id") || ""));
        break;
      case EnumModalType.ProjectForm:
        navigate(Routes.pages.project.form(searchParams.get("id") || ""));
        break;
      case EnumModalType.TaskForm:
        navigate(Routes.pages.task.form(searchParams.get("id") || ""));
        break;
      default:
        navigate({
          pathname: location.pathname,
          search: "", //searchParams.toString(),
        });
    }
  }

  useEffect(() => {
    setModal(searchParams.get("modal") || "");
  }, [searchParams]);

  return (
    <>
      {modal === EnumModalType.ProjectForm && (
        <Modal.Project open={true} onClose={handleModalClose} />
      )}
      {modal === EnumModalType.TaskForm && (
        <Modal.Task open={true} onClose={handleModalClose} />
      )}
      {modal === EnumModalType.ComponentForm && (
        <Modal.Component open={true} onClose={handleModalClose} />
      )}
      {modal === EnumModalType.ComponentList && (
        <Modal.ComponentList open={true} onClose={handleModalClose} />
      )}
    </>
  );
};
