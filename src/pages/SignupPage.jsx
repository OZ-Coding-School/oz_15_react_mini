import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../contexts/AuthContext";

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateName = (value) => {
    if (!value) return "이름을 입력해주세요.";
    const reg = /^[A-Za-z0-9가-힣]{2,8}$/;
    if (!reg.test(value)) {
      return "이름은 2~8자, 숫자/한글/영어만 사용할 수 있습니다.";
    }
    return "";
  };

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
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    if (!hasLetter || !hasNumber) {
      return "영문 대문자/소문자와 숫자의 조합을 사용해주세요.";
    }
    return "";
  };

  const validatePasswordCheck = (value) => {
    if (!value) return "비밀번호를 다시 한 번 입력해주세요.";
    if (value !== password) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameMsg = validateName(name);
    const emailMsg = validateEmail(email);
    const passwordMsg = validatePassword(password);
    const passwordCheckMsg = validatePasswordCheck(passwordCheck);

    setNameError(nameMsg);
    setEmailError(emailMsg);
    setPasswordError(passwordMsg);
    setPasswordCheckError(passwordCheckMsg);
    setSubmitError("");

    if (nameMsg || emailMsg || passwordMsg || passwordCheckMsg) {
      return;
    }

    try {
      await signUp({ email, password });
      alert("회원가입을 축하합니다! Munching Movies에 오신 것을 환영합니다.");
      navigate("/");
    } catch (error) {
      setSubmitError(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          label="이름"
          value={name}
          onChange={setName}
          error={nameError}
          placeholder="이름을 입력하세요."
        />
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
          placeholder="영문 + 숫자, 8자 이상"
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          error={passwordCheckError}
          placeholder="비밀번호를 다시 입력하세요."
        />

        {submitError && (
          <p className="text-sm text-red-500 mb-3">{submitError}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 rounded bg-gray-700 text-white text-sm"
        >
          회원가입
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
export default SignupPage;
