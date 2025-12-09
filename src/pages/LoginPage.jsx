import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (value) => {
    if (!value) return "이메일을 입력해주세요.";
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reg.test(value)) {
      return "이메일 형식으로 작성해주세요.";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailMsg = validateEmail(email);
    const passwordMsg = validatePassword(password);

    setEmailError(emailMsg);
    setPasswordError(passwordMsg);
    setSubmitError("");

    if (emailMsg || passwordMsg) return;

    try {
      await signIn({ email, password });
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.message === "Invalid login credentials") {
        setSubmitError("가입된 이메일 주소가 아닙니다.");
      } else {
        setSubmitError(
          "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          type="email"
          value={email}
          onChange={setEmail}
          error={emailError}
          placeholder="example@email.com"
        />
        <InputField
          label="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          error={passwordError}
          placeholder="비밀번호를 입력하세요."
        />

        {submitError && (
          <p className="text-sm text-red-500 mb-3">{submitError}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded bg-gray-700 text-white text-sm"
        >
          로그인
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Munching Movies가 처음이신가요?{" "}
        <Link to="/signup" className="underline">
          간편 가입
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
