import { Course } from "@/models/course.model";

type VideoDetailProps = {
  course: Course;
};
const VideoDetail = ({ course }: VideoDetailProps) => {
  return <div>{course.title}</div>;
};

export default VideoDetail;
