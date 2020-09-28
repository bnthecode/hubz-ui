import http from "../http/http-config";

export const uploadProfileImg = async (file) => {
  const { data } = await http.post("/api/users/profile-img", file, {
    headers: { "content-type": "multipart/form-data" },
  });
  return { data };
};
