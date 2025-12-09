export function validateName(name) {
  if (!name) return "이름을 입력해주세요.";
  const regex = /^[0-9a-zA-Z가-힣]{2,8}$/;
  if (!regex.test(name)) {
    return "이름은 2~8자, 숫자/한글/영어만 사용할 수 있습니다.";
  }
  return "";
}

// 이메일 형식
export function validateEmail(email) {
  if (!email) return "이메일을 입력해주세요.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "";
}

// 비밀번호: 영어 대/소문자 + 숫자 조합, 8자 이상
export function validatePassword(password) {
  if (!password) return "비밀번호를 입력해주세요.";
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(password)) {
    return "비밀번호는 8자 이상, 영어 대소문자와 숫자를 모두 포함해야 합니다.";
  }
  return "";
}

// 비밀번호 확인: 비밀번호와 일치
export function validatePasswordConfirm(password, confirm) {
  if (!confirm) return "비밀번호 확인을 입력해주세요.";
  if (password !== confirm) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
}