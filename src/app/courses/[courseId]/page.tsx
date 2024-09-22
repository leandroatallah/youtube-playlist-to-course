"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { Course } from "@/models/course.model";
import VideoDetail from "@/components/VideoDetail";
import LessonList from "@/components/LessonList";
import { getCourseById, updateCurrentLesson } from "@/services/course.crud";
import { Lesson } from "@/models/lesson.model";
import {
  setLessonAsDone,
  setLessonAsUndone,
} from "@/repositories/lesson.repository";
import { useToast } from "@/context/ToastContext";
import { Header } from "@/components/Header";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>();

  const currentLesson = course?.lessons.find(
    (lesson) => lesson.id === course.currentLessonId,
  );

  const fetchCourse = useCallback(() => {
    setCourse(getCourseById(params.courseId));
  }, [params.courseId]);

  useLayoutEffect(() => {
    // document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const CustomCourseTitle = useCallback(() => {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#FAFAFA",
            borderRadius: 40,
            color: "#444",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            location.href = "/courses";
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: 12,
              marginLeft: -3,
            }}
          >
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {course?.title}
          </div>
          <div
            style={{
              fontSize: 14,
            }}
          >
            {currentLesson?.title}
          </div>
        </div>
      </div>
    );
  }, [course?.title, currentLesson?.title]);

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
      toast.error();
      return;
    }

    if (currentLesson.done) {
      setLessonAsUndone(course.id, currentLesson.id);
      toast("O curso foi marcado como pendente.");
    } else {
      setLessonAsDone(course.id, currentLesson.id);
      toast("O curso foi marcado como concluído.");
    }

    fetchCourse();
  };

  if (!course || !course.currentLessonId) {
    return <div>Not found</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div
        className="full-width"
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header headerTitle={<CustomCourseTitle />} hideNav />
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            borderTop: "2px solid #777",
            height: "calc(100% - 80px)",
          }}
        >
          <div
            style={{
              width: "calc(100% - 380px)",
            }}
          >
            <VideoDetail course={course} onFinish={handleOnFinishLesson} />
          </div>

          <div
            style={{
              width: 380,
            }}
          >
            <LessonList
              currentLessonId={course.currentLessonId}
              course={course}
              items={course.lessons}
              onSelectLesson={(lessonId) => handleOnSelectLesson(lessonId)}
              toggleLessonStatus={(lesson) => handleOnFinishLesson(lesson)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
