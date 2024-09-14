"use client";

import { useMemo } from "react";

import { getDataFromLocalStorage } from "@/database/localStorage";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const courses = useMemo(() => {
    const data = getDataFromLocalStorage();
    return data.courses;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {courses.map((course) => (
        <CourseItem key={course.id} data={course} />
      ))}
    </div>
  );
};

export default CourseList;
