const apiToken = import.meta.env.VITE_TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
};

export default options;
