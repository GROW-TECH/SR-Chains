export const isLoggedIn = () => {
  return !!localStorage.getItem("sr_user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("sr_user"));
};

export const setUser = (user) => {
  localStorage.setItem("sr_user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("sr_user");
};
