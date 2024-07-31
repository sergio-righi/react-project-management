import { useState } from "react";
import { useApp } from "contexts";

// icons
import { AddRounded } from "@mui/icons-material";
import { Controller, Custom, Modal } from "components";

type Props = {};

export const Footer = (props: Props) => {
  const { t } = useApp();
  const [currentState, setCurrentState] = useState<boolean>(false);

  const [modalTaskOpened, setModalTaskOpened] = useState<boolean>(false);
  const [modalProjectOpened, setModalProjectOpened] = useState<boolean>(false);

  function handleStateChange(state: boolean) {
    setCurrentState(state);
  }

  return (
    <>
      <Controller.Fab
        state={currentState}
        items={[
          <Custom.Fab
            size="small"
            text={t.label.task}
            key="add-task"
            onStateChange={() => setModalTaskOpened(true)}
          >
            <AddRounded />
          </Custom.Fab>,
          <Custom.Fab
            size="small"
            text={t.label.project}
            key="add-project"
            onStateChange={() => setModalProjectOpened(true)}
          >
            <AddRounded />
          </Custom.Fab>,
        ]}
      >
        <Custom.Fab
          closable
          state={currentState}
          onStateChange={handleStateChange}
        >
          <AddRounded />
        </Custom.Fab>
      </Controller.Fab>
      <Modal.Task
        open={modalTaskOpened}
        onClose={() => setModalTaskOpened(false)}
      />
      <Modal.Project
        open={modalProjectOpened}
        onClose={() => setModalProjectOpened(false)}
      />
    </>
  );
};
