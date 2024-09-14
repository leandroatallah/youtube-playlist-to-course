"use client";

import { useMemo } from "react";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { Course } from "@/models/course.model";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const course: Course | undefined = useMemo(() => {
    const data = getDataFromLocalStorage();
    return data.courses.find((course) => course.playlistId === params.courseId);
  }, []);

  if (!course) {
    return <div>Not found</div>;
  }
  return <h1>{course?.title}</h1>;
};

export default CourseDetail;
