import { useState } from "react";

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);

  return {
    openModal,
    toggle
  }
}