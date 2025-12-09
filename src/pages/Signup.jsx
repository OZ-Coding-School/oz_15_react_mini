// src/pages/Signup.jsx
import React, { useState } from "react";
import FormInput from "../components/common/FormInput";

import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../utils/validators";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      passwordConfirm: validatePasswordConfirm(
        form.password,
        form.passwordConfirm
      ),
    };

    

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg);
    if (hasError) return;

    try {
      setSubmitting(true);

      // ✅ Supabase 회원가입 호출
      const { user, error } = await signUp({
        email: form.email,
        password: form.password,
        userName: form.name,
      });

      if (error) {
        setServerError(error.message || "회원가입에 실패했습니다.");
        return;
      }

      alert("회원가입이 완료되었습니다!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
      window.location.reload();

    } catch (err) {
      console.error(err);
      setServerError("알 수 없는 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <Link to="/" className="nav-logo">
            <img src={logo} alt="logo" className="nav-logo-img" />
            <span className="nav-title" style={{ marginLeft: "6px" }}>
              테레비-죤
            </span>
          </Link>
        </div>

        <h1 className="auth-title">회원가입</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="이름"
            name="name"
            value={form.name}
            placeholder="이름을 입력하세요."
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange}
            error={errors.password}
          />
          <FormInput
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            placeholder="비밀번호를 다시 입력하세요."
            onChange={handleChange}
            error={errors.passwordConfirm}
          />

          {serverError && (
            <p
              className="form-error"
              style={{ color: "tomato", marginTop: "4px" }}
            >
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={submitting}
          >
            {submitting ? "회원가입 중..." : "회원가입"}
          </button>

          <div className="auth-bottom-row">
            <span>이미 회원이신가요?</span>
            <Link to="/login" className="auth-signup-link">
              로그인 하러가기
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}