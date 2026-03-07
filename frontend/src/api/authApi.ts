import axiosClient from "./axiosClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export const loginApi = async (payload: LoginPayload) => {
  const form = new URLSearchParams();
  form.append("username", payload.email);
  form.append("password", payload.password);

  const res = await axiosClient.post<LoginResponse>("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};
