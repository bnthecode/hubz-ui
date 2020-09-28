import http from "./http-config";
// create
export const createDrive = async () => {
  const {
    data: { drive },
  } = await http.post(`/api/drive`);
  return { drive };
};

// get
export const getDrive = async (driveId) => {
  const {
    data: { drive },
  } = await http.get(`/api/drive/${driveId}`);
  return { drive };
};

export const createFolder = async (driveId, folder) => {
  const {
    data: { folders },
  } = await http.post(`/api/drive/${driveId}/folders`, { folder });
  return { folders };
};

export const createFile = async (driveId, folderId, file) => {
  const {
    data: { folders },
  } = await http.post(`/api/drive/${driveId}/folders/${folderId}/files`, {
    file,
  });
  return { folders };
};
