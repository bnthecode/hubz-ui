import http from "./http-config";

export const createHome = async (createdHome) => {
  const {
    data: { home },
  } = await http.post("/api/homes", createdHome);
  return { home };
};

export const getHomes = async () => {
  const {
    data: { homes },
  } = await http.get("/api/homes");
  return { homes };
};
export const getHome = async (homeId) => {
  const {
    data: { home },
  } = await http.get(`/api/homes/${homeId}`);
  return { home };
};

export const addHomeUser = async (homeId, user) => {
  const {
    data: { home, temp_pw },
  } = await http.post(`/api/homes/${homeId}/add-user`, user);
  return { home, temp_pw };
};
