import { useToast } from "@/context/ToastContext";

import { Form } from "./Form";
import Modal from "./Modal";

type ModalAddCourseProps = {
  onClose: () => void;
};

export const ModalAddCourse = ({ onClose }: ModalAddCourseProps) => {
  const { toast } = useToast();
  return (
    <Modal title="Adicionar novo curso" onClose={onClose}>
      <Form
        onSuccess={() => {
          toast("Curso criado com sucesso.");
          onClose();
        }}
      />
    </Modal>
  );
};
