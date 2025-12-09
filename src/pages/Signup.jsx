import { useState } from "react";
import { LoginSignupInput } from "../components/LoginSignupInput";
import { emailRule, nameRule, passwordRule } from "../constants";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";
function Signup() {
  const { signUp } = useSupabaseAuth();
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const signupError = () => {
    const newErrors = { name: "", email: "", password: "", checkPassword: "" };

    Object.keys(signupInfo).forEach((key) => {
      if (!signupInfo[key]) {
        if (key === "name") newErrors[key] = "이름을 입력해주세요.";
        if (key === "email") newErrors[key] = "이메일을 입력해주세요.";
        if (key === "password") newErrors[key] = "비밀번호를 입력해주세요.";
        if (key === "checkPassword")
          newErrors[key] = "비밀번호를 입력해주세요.";
      }
    });

    if (signupInfo.name) {
      if (!nameRule.test(signupInfo.name)) {
        newErrors.name = "이름은 2~8자의 한글, 영어, 숫자만 가능합니다.";
      }
    }

    if (signupInfo.email) {
      if (!emailRule.test(signupInfo.email)) {
        newErrors.email = "올바른 이메일 형식을 입력해주세요.";
      }
    }

    if (signupInfo.password) {
      if (!passwordRule.test(signupInfo.password)) {
        newErrors.password =
          "비밀번호는 영어 대문자, 소문자, 숫자를 모두 포함하며 8자리 이상이여야 합니다.";
      }
    }

    if (
      signupInfo.password &&
      signupInfo.checkPassword &&
      signupInfo.password !== signupInfo.checkPassword
    ) {
      newErrors.checkPassword = "비밀번호가 일치하지 않습니다";
    }
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signupError()) return;
    signUp({
      email: signupInfo.email,
      password: signupInfo.password,
      name: signupInfo.name,
    })
      .then(({ data, error }) => {
        if (error) {
          alert("회원가입 실패" + error.message);
          return;
        }
        console.log("회원가입 성공!" + data);
        alert("회원가입이 완료되었습니다");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("알 수 없는 오류가 발생했습니다");
      });
  };

  return (
    <form onSubmit={handleSubmit} className=" w-[300px] m-auto mt-[50px]">
      <div className="flex justify-center">
        <p className="text-3xl mb-12">회원가입</p>
      </div>

      <LoginSignupInput
        label="이메일"
        name="email"
        type="email"
        value={signupInfo.email}
        error={errors.email}
        onChange={handleChange}
      />
      <LoginSignupInput
        label="이름"
        name="name"
        type="text"
        value={signupInfo.name}
        error={errors.name}
        onChange={handleChange}
      />
      <LoginSignupInput
        label="비밀번호"
        name="password"
        type="password"
        value={signupInfo.password}
        error={errors.password}
        onChange={handleChange}
      />

      <LoginSignupInput
        label="비밀번호 확인"
        name="checkPassword"
        type="password"
        value={signupInfo.checkPassword}
        error={errors.checkPassword}
        onChange={handleChange}
      />

      <div className="flex justify-center mt-3">
        <button
          type="submit"
          className=" border w-[80%] p-2.5 rounded-2xl m-2.5 bg-gray-500 text-white"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Signup;
