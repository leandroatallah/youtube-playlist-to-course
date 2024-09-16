import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/database/localStorage";

// const currentStorage = localStorageService;

export const setCurrentLesson = (
  courseId: string,
  lessonId: string,
): unknown => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  const course = data.courses.find((course) => course.id);

  if (!course) {
    return {
      status: 400,
    };
  }

  setDataToLocalStorage({
    ...data,
    courses: data.courses.map((course) => {
      if (course.id !== courseId) return course;

      return {
        ...course,
        currentLessonId: lessonId,
      };
    }),
  });

  return { status: 201 };
};
