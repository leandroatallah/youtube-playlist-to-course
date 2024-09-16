"use client";

import { useCallback, useEffect, useState } from "react";

import { Course } from "@/models/course.model";
import VideoDetail from "@/components/VideoDetail";
import LessonList from "@/components/LessonList";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { getCourseById, updateCurrentLesson } from "@/services/course.crud";
import { Lesson } from "@/models/lesson.model";
import {
  setLessonAsDone,
  setLessonAsUndone,
} from "@/repositories/lesson.repository";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>();

  const fetchCourse = useCallback(() => {
    setCourse(getCourseById(params.courseId));
  }, [params.courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleOnSelectLesson = useCallback(
    (lessonId: string) => {
      if (!course?.id) {
        // ...
        return;
      }

      if (course.currentLessonId === lessonId) {
        return;
      }

      updateCurrentLesson(course?.id, lessonId);

      location.reload();
    },
    [course?.currentLessonId, course?.id],
  );

  const handleOnFinishLesson = (currentLesson: Lesson | null) => {
    if (!course || !currentLesson) {
      // ...
      return;
    }

    if (currentLesson.done) {
      setLessonAsUndone(course.id, currentLesson.id);
    } else {
      setLessonAsDone(course.id, currentLesson.id);
    }

    fetchCourse();
  };

  if (!course || !course.currentLessonId) {
    return <div>Not found</div>;
  }

  return (
    <div
      style={{
        maxWidth: 1024,
        margin: "0 auto",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyItems: "space-between",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Logo />
        </div>
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
          onClick={() => router.push("/courses")}
        >
          Meus cursos
        </button>
      </div>
      <h1
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 32,
        }}
      >
        {course?.title}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 20,
        }}
      >
        <div
          style={{
            width: "calc(100% - 280px)",
          }}
        >
          <VideoDetail course={course} onFinish={handleOnFinishLesson} />
        </div>

        <div
          style={{
            width: 280,
          }}
        >
          <LessonList
            currentLessonId={course.currentLessonId}
            course={course}
            items={course.lessons}
            onSelectLesson={(lessonId) => handleOnSelectLesson(lessonId)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
