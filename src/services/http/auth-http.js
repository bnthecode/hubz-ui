import http from "../http/http-config";

export const createUser = async (createdUser) => {
  const {
    data: { user },
  } = await http.post("/api/users", { user: createdUser });
  return user;
};

export const getUser = async ({ username, password }) => {
  const {
    data: { user },
  } = await http.put("/api/users", { username, password });
  return user;
};

export const getUserWithAccessKey = async (user) => {
  const {
    data: { user : newUser },
  } = await http.put("/api/users/access_key", user);
  return newUser;
};
