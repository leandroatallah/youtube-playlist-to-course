"use client";

import { useRouter } from "next/navigation";

import { Course } from "@/models/course.model";
import { Button } from "./Button";

type CourseItemProp = {
  data: Course;
  onDeleteCourse: () => void;
};

const CourseItem = ({ data, onDeleteCourse }: CourseItemProp) => {
  const router = useRouter();

  const handlePushToDetail = () => router.push(`/courses/${data.playlistId}`);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: 10,
        borderBottom: "1px solid #777",
      }}
    >
      <div
        style={{
          width: 120,
          height: 90,
          backgroundColor: "rgba(124, 124, 124, 0.5)",
          backgroundImage: `url(${data.thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
        onClick={handlePushToDetail}
      />
      <div
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={handlePushToDetail}
      >
        {data.title}
      </div>
      <div>
        <Button
          type="button"
          style={{
            padding: 4,
            fontSize: 12,
            height: "auto",
          }}
          variant="outline"
          onClick={onDeleteCourse}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CourseItem;
