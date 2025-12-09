import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //웹 페이지 처음 접속 시 Supabase에서 유저 정보 가져오기
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      return;
    }
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
    }
    loadUser();
  }, []);

  //회원가입
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    }
  };

  //로그인
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    }
  };

  //로그아웃
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  const value = { user, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
