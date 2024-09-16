import { Lesson } from "./lesson.model";

export type Course = {
  id: string;
  title: string;
  description: string;
  playlistId: string;
  channelTitle: string;
  channelId: string;
  thumbnailUrl: string;
  lessons: Lesson[];
  currentLessonId: string | null;
};

export type CoursePayload = Omit<Course, "id" | "lessons"> & {
  lessons: Omit<Lesson, "id">[];
};
