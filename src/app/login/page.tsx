"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import globalStyles from "@/styles/global.module.css";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";

import styles from "./page.module.css";
import GoogleIcon from "./icons/GoogleIcon";

export default function Home() {
  const router = useRouter();
  const { isUserLoggedIn, handleLogin, forgotPassword, handleOAuthLogin } =
    useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isUserLoggedIn) {
    router.push("/courses");
  }

  return (
    <main className={globalStyles.container}>
      <Header />
      <div className={styles.formContainer}>
        <h2
          className={globalStyles.pageTitle}
          style={{
            textAlign: "center",
          }}
        >
          Acessar conta
        </h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={globalStyles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={globalStyles.input}
          />
        </div>

        <div className={styles.buttonStack}>
          <Button
            variant="primary"
            onClick={() => {
              handleLogin("SIGNUP", email, password);
            }}
          >
            Cadastrar
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              handleLogin("LOGIN", email, password);
            }}
          >
            {password.length ? "Entrar" : "Enviar link para o email"}
          </Button>
        </div>

        <div className={styles.forgotPassword}>
          <a onClick={forgotPassword} href="/" className={styles.forgotLink}>
            Esqueceu sua senha?
          </a>
        </div>

        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span>ou</span>
        </div>

        <div className={styles.buttonStack}>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin("google")}
            style={{ width: "100%" }}
            icon={<GoogleIcon />}
          >
            Conectar com Google
          </Button>
        </div>
      </div>
    </main>
  );
}
