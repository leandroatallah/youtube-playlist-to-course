"use client";

import { getAllCourses } from "@/services/course.crud";
import Logo from "./Logo";

export const Header = () => {
  const hasCourses = !!getAllCourses()?.length;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          flex: hasCourses ? 1 : "unset",
        }}
      >
        <Logo />
      </div>
      {hasCourses && (
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
