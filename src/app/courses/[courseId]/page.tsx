"use client";

import { useMemo } from "react";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { Course } from "@/models/course.model";
import VideoDetail from "@/components/VideoDetail";
import LessonList from "@/components/LessonList";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const course: Course | undefined = useMemo(() => {
    const data = getDataFromLocalStorage();
    return data.courses.find((course) => course.playlistId === params.courseId);
  }, []);

  if (!course) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <h1>{course?.title}</h1>
      <VideoDetail />
      <LessonList
        // currentLessonId={params.lessonId}
        courseId={course.id}
        items={course.lessons}
      />
    </div>
  );
};

export default CourseDetail;
