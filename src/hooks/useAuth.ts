import { Provider, Session, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { useToast } from "@/context/ToastContext";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY,
} from "@/constants";

function createSupabaseClient() {
  if (!NEXT_PUBLIC_SUPABASE_URL)
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
  if (!NEXT_PUBLIC_SUPABASE_KEY)
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");

  return createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY);
}

export const useAuth = () => {
  const { toast } = useToast();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createSupabaseClient();

  const isUserLoggedIn = !!session?.access_token;

  const handleLogin = async (
    type: "LOGIN" | "SIGNUP",
    email: string,
    password: string,
  ) => {
    try {
      const {
        error,
        data: { user },
      } =
        type === "LOGIN"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });
      if (!error && !user) {
        toast("Check your email for the login link!");
      }
      if (error) {
        toast.error();
        console.log("Error returned:", error.message);
      }
    } catch (error: any) {
      toast.error();
      console.log("Error thrown:", error.message);
      console.log(error.error_description || error);
    }
  };

  async function handleSignOut() {
    return await supabase.auth.signOut();
  }

  async function handleOAuthLogin(provider: Provider) {
    let { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      toast.error();
    }
  }

  async function forgotPassword(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    var email = prompt("Please enter your email:");
    if (email === null || email === "") {
      toast.error("You must enter your email.");
    } else {
      let { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        toast.error();
      } else {
        toast("Password recovery email has been sent.");
      }
    }
  }

  useEffect(() => {
    (async () => {
      await supabase.auth.getSession();
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      setIsLoadingAuth(false);
    })();
  }, []);

  return {
    isUserLoggedIn,
    isLoadingAuth,
    handleLogin,
    handleOAuthLogin,
    forgotPassword,
    handleSignOut,
  };
};
