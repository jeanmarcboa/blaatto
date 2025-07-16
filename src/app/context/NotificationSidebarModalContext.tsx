"use client";
import React, { createContext, useContext, useState } from "react";

interface CartModalContextType {
  isNotificationModalOpen: boolean;
  openNotificationModal: () => void;
  closeNotificationModal: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined
);

export const useNotificationModalContext = () => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const NotificationModalProvider = ({ children }) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const openNotificationModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  return (
    <CartModalContext.Provider
      value={{
        isNotificationModalOpen,
        openNotificationModal,
        closeNotificationModal,
      }}
    >
      {children}
    </CartModalContext.Provider>
  );
};
