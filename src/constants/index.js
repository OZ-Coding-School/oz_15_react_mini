const apiToken = import.meta.env.VITE_TOKEN;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
};
export const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRule = /^[a-zA-Z0-9가-힣]{2,8}$/;
export const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

