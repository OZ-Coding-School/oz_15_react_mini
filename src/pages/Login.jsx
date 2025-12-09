import { useState } from "react";
import { LoginSignupInput } from "../components/LoginSignupInput";
import { emailRule, passwordRule } from "../constants";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";
function Login({ setIsLogin }) {
  const { login } = useSupabaseAuth();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const loginError = () => {
    const newErrors = { email: "", password: "" };

    if (!loginInfo.email) newErrors.email = "이메일을 입력해주세요.";
    if (!loginInfo.password) newErrors.password = "비밀번호를 입력해주세요.";

    if (loginInfo.email && !emailRule.test(loginInfo.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }
    if (loginInfo.password && !passwordRule.test(loginInfo.password)) {
      newErrors.password = "비밀번호는 8자리 이상이여야 합니다.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginError()) {
      login({ email: loginInfo.email, password: loginInfo.password })
        .then(({ data, error }) => {
          if (error) {
            alert("로그인 실패:" + error.message);
            return;
          }
          console.log("로그인 성공:", data);
          setIsLogin(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("오류가 발생 했습니다");
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" w-[300px] m-auto mt-[50px]">
      <div className="flex justify-center">
        <p className="text-3xl mb-12">로그인</p>
      </div>

      <LoginSignupInput
        label="이메일"
        name="email"
        type="email"
        value={loginInfo.email}
        error={errors.email}
        onChange={handleChange}
      />

      <LoginSignupInput
        label="비밀번호"
        name="password"
        type="password"
        value={loginInfo.password}
        error={errors.password}
        onChange={handleChange}
      />

      <div className="flex justify-center mt-3">
        <button
          type="submit"
          className=" border w-[80%] p-2.5 rounded-2xl m-2.5 bg-gray-500 text-white"
        >
          로그인
        </button>
      </div>
    </form>
  );
}

export default Login;
