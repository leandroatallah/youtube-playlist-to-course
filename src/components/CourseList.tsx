"use client";

import { useEffect, useMemo, useState } from "react";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { deleteCourse } from "@/services/course.crud";
import CourseItem from "./CourseItem";
import { Course } from "@/models/course.model";

const CourseList = () => {
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
    </div>
  );
};

export default CourseList;
