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

