"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { deleteCourse } from "@/services/course.crud";
import { Course } from "@/models/course.model";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourseList = () => {
    const data = getDataFromLocalStorage();
    setCourses(data.courses);
  };

  const handleRemoveCourse = (courseId: string) => {
    const result = deleteCourse(courseId);

    if (result.status === 202) {
      fetchCourseList();
    }
  };

  useEffect(() => {
    fetchCourseList();
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
        <CourseItem
          key={course.id}
          data={course}
          onDeleteCourse={() => handleRemoveCourse(course.id)}
        />
      ))}

      <button
        type="button"
        onClick={() => router.push("/")}
        style={{
          width: "100%",
          cursor: "pointer",
        }}
      >
        + adicionar curso
      </button>
    </div>
  );
};

export default CourseList;
