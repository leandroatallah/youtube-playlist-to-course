"use client";

import { ReactNode } from "react";

import styles from "./Header.module.css";
import Logo from "../Logo";
import { Button } from "../Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";

type HeaderProps = {
  headerTitle?: ReactNode;
  hideNav?: boolean;
  disableLogoLink?: boolean;
};

export const Header = ({
  headerTitle,
  hideNav,
  disableLogoLink,
}: HeaderProps) => {
  const { isUserLoggedIn, isLoadingAuth, handleSignOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await handleSignOut();
    if (error) {
      toast.error();
      return;
    }
    location.href = "/";
    return;
  };

  return (
    <div className={styles.container}>
      {headerTitle}
      <div className={styles.logo}>
        <Logo
          style={{
            display: "inline-block",
            cursor: !disableLogoLink ? "pointer" : "default",
          }}
          onClick={() => {
            if (!disableLogoLink) {
              location.href = "/";
            }
          }}
        />
      </div>
      {!isLoadingAuth && !hideNav && (
        <div className={styles.nav}>
          {isUserLoggedIn && (
            <Button
              variant="text"
              onClick={() => {
                location.href = "/courses";
              }}
            >
              Meus cursos
            </Button>
          )}
          <Button
            variant="text"
            onClick={async () => {
              if (isUserLoggedIn) {
                handleLogout();
                return;
              }

              location.href = "/login";
            }}
          >
            {isUserLoggedIn ? "Sair" : "Entrar"}
          </Button>
        </div>
      )}
    </div>
  );
};
