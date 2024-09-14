"use client";

import { useRouter } from "next/navigation";

import { Course } from "@/models/course.model";

type CourseItemProp = {
  data: Course;
};

const CourseItem = ({ data }: CourseItemProp) => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        cursor: "pointer",
        padding: 10,
        borderBottom: "1px solid #777",
      }}
      onClick={() => router.push(`/courses/${data.playlistId}`)}
    >
      <div
        style={{
          width: 120,
          height: 90,
          backgroundColor: "rgba(124, 124, 124, 0.5)",
          backgroundImage: `url(${data.thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {data.title}
      </div>
    </div>
  );
};

export default CourseItem;
