import React, { useState } from "react";
import FormInput from "../components/common/FormInput";
import { validateEmail, validatePassword } from "../utils/validators";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";

export default function Login() {
  const navigate = useNavigate();             
  const { login } = useSupabaseAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false); // 버튼 중복 클릭 방지
  const [serverError, setServerError] = useState("");  // 서버 에러 메시지

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 입력하면서 에러도 실시간으로 지우고 다시 검사
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError(""); // 이전 에러 초기화

  const newErrors = {
    email: validateEmail(form.email),
    password: validatePassword(form.password),
  };

  setErrors(newErrors);

  const hasError = Object.values(newErrors).some((msg) => msg);
  if (hasError) return;

  try {
    setSubmitting(true);

    // ✅ Supabase 로그인 호출
    const { error } = await login({
      email: form.email,
      password: form.password,
    });

    if (error) {
      // Supabase에서 온 에러 메시지 보여주기
      setServerError(error.message || "로그인에 실패했습니다.");
      return;
    }

    alert("로그인 되었습니다!");
    localStorage.setItem("isLoggedIn", "true");

    // 여기까지 왔으면 로그인 성공
    // user 정보는 SupabaseProvider/useSupabaseAuth 쪽에서 LocalStorage(userInfo)에 저장해 줄 거야
    // 로그인 성공 후 메인 페이지로 이동
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

        <h1 className="auth-title" >로그인</h1>

        <form onSubmit={handleSubmit} className="auth-form">
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

          {serverError && (
          <p className="form-error" style={{ color: "tomato", marginTop: "4px" }}>
          {serverError}
          </p>
        )}

          <button type="submit" className="auth-submit-btn" disabled={submitting}>
          {submitting ? "로그인 중..." : "로그인"}
          </button>

          <div className="auth-bottom-row">
          <span>회원이 아니신가요?</span>
          <Link to="/signup" className="auth-signup-link">
            회원가입 하러가기
          </Link>
        </div>
        </form>
      </div>
    </main>
  );
}