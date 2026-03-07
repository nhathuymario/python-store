export const saveToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const saveIsAdmin = (isAdmin: boolean) => {
  localStorage.setItem("is_admin", String(isAdmin));
};

export const getIsAdmin = () => {
  return localStorage.getItem("is_admin") === "true";
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("is_admin");
};
