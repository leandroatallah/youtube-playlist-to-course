"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Course } from "@/models/course.model";
import { getProgress } from "@/utils/get-pregress";

import { Button } from "../Button";
import Modal from "../Modal";
import styles from "./CourseItem.module.css";

type CourseItemProp = {
  data: Course;
  onDeleteCourse: () => void;
};

const CourseItem = ({ data, onDeleteCourse }: CourseItemProp) => {
  const router = useRouter();

  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);

  const handlePushToDetail = () => router.push(`/courses/${data.playlistId}`);

  const progress = useMemo(() => getProgress(data.lessons), [data.lessons]);

  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.thumbnail}
          onClick={handlePushToDetail}
          style={{
            backgroundImage: `url(${data.thumbnailUrl})`,
          }}
        />
      </div>
      <div className={styles.content} onClick={handlePushToDetail}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.progress}>Progresso: {progress}%</div>
      </div>
      <div>
        <Button
          type="button"
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="12px"
              width="12px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
            </svg>
          }
          style={{
            padding: 6,
            fontSize: 12,
            height: "auto",
          }}
          variant="outline"
          onClick={() => setShowConfirmDeletion(true)}
        >
          Remove
        </Button>
      </div>
      {showConfirmDeletion && (
        <Modal
          title="Remover curso"
          onClose={() => setShowConfirmDeletion(false)}
        >
          <div>Tem certeza que deseja remover o curso?</div>
          <Button onClick={onDeleteCourse}>Remover curso</Button>
          <Button
            variant="outline"
            onClick={() => setShowConfirmDeletion(false)}
          >
            Cancelar
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default CourseItem;
