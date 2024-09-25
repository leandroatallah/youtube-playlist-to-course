import { Course, CoursePayload } from "@/models/course.model";
import * as courseRepository from "@/repositories/course.repository";
import * as lessonRepository from "@/repositories/lesson.repository";

export const getCourseById = (courseId: string): Course | null => {
  const course = courseRepository.getById(courseId);

  if (!course) {
    // ...
  }

  return course || null;
};

export const getAllCourses = (): Course[] => {
  const courses = courseRepository.getAll();

  if (!courses) {
    return [];
  }

  return courses;
};

export const createCourse = (data: CoursePayload) => {
  const result = courseRepository.create(data);
  return result;
};

export const deleteCourse = (courseId: string) => {
  const result = courseRepository.remove(courseId);
  return result;
};

export const updateCourse = () => {
  // ...
};

export const updateCurrentLesson = (courseId: string, lessonId: string) => {
  const result = lessonRepository.setCurrentLesson(courseId, lessonId);
  return result;
};

export const exportCourses = () => {
  const { status, ...data } = courseRepository.exportAll();

  if (status === 400) {
    // ...
    return;
  }

  return new URLSearchParams({ data: JSON.stringify(data) });
};

export const importCourses = async (data: courseRepository.ImportData) => {
  const { status } = await courseRepository.importAll(data);

  if (status === 400) {
    // ...
    return { status };
  }

  return { status };
};
