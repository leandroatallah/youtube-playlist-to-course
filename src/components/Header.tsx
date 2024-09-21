"use client";

import { ReactNode } from "react";

import { getAllCourses } from "@/services/course.crud";
import Logo from "./Logo";

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
  const hasCourses = !!getAllCourses()?.length;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: "0 20px",
        height: 80,
      }}
    >
      {!!headerTitle && headerTitle}
      <div
        style={{
          flex: hasCourses && !headerTitle ? 1 : "unset",
        }}
      >
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
      {!hideNav && hasCourses && (
        <button
          type="button"
          style={{
            padding: 0,
            border: 0,
            background: "unset",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => {
            location.href = "/courses";
          }}
        >
          Meus cursos
        </button>
      )}
    </div>
  );
};
