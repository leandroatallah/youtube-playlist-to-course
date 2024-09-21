"use client";

import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import globalStyles from "@/styles/global.module.css";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={globalStyles.container}>
      <Header disableLogoLink />
      <div
        className={globalStyles.flexCenter}
        style={{
          flex: 1,
        }}
      >
        <div className={styles.container}>
          <h1 className={styles.title}>
            Converta playlists do <span>Youtube</span> em cursos!
          </h1>
          <Form
            onSuccess={() => {
              location.href = "/courses";
            }}
          />
        </div>
      </div>
    </main>
  );
}
