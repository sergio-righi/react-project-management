import { Modal } from "components";
import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { EnumModalType } from "utils/enums";

export const Popup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [modalTaskOpened, setModalTaskOpened] = useState<boolean>(false);
  const [modalProjectOpened, setModalProjectOpened] = useState<boolean>(false);

  function handleModalClose() {
    searchParams.delete("id");
    searchParams.delete("modal");

    setModalTaskOpened(false);
    setModalProjectOpened(false);

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal === EnumModalType.Project) {
      setModalProjectOpened(true);
    } else if (modal === EnumModalType.Task) {
      setModalTaskOpened(true);
    }
  }, [searchParams]);

  return (
    <>
      <Modal.Project open={modalProjectOpened} onClose={handleModalClose} />
      <Modal.Task open={modalTaskOpened} onClose={handleModalClose} />
    </>
  );
};
