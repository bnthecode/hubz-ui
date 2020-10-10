import {
  setDrive,
  setSelectedDriveItem,
  setDriveLoading,
  setDriveFolders,
} from "../../redux/actions/pages/driveActions";
import {
  createDrive,
  createFolder,
  createFile,
  getDrive,
} from "../../services/http/drive-http";

/// workflow handles every event that will happen based on a failure / success
const useCatch = async (tryItems, catchItems, finalItems) => {
  try {
    await tryItems();
  } catch {
    // we should actually start dispatching notifications here....
    await catchItems();
  } finally {
    await finalItems();
  }
};

export const initDrivePageWorkflow = (driveId) => async (dispatch) => {
  const tryItems = async () => {
    dispatch(setDriveLoading(true));
    const { drive } = await getDrive(driveId);
    dispatch(setDrive(drive));
  };

  const catchItems = () => {
  };
  const finalItems = () => {
    dispatch(setDriveLoading(false));
    dispatch(setSelectedDriveItem({}));
  };

  await useCatch(tryItems, catchItems, finalItems);
};


export const createFolderWorkflow = (driveId, folder) => async (dispatch) => {
  const tryItems = async () => {
    dispatch(setDriveLoading(true));
    const { folders } = await createFolder(driveId, folder);
    dispatch(setDriveFolders(folders));
  };

  const catchItems = () => {
    dispatch(setDriveFolders([]));
  };

  const finalItems = () => {
    dispatch(setDriveLoading(false));
  };

  await useCatch(tryItems, catchItems, finalItems);
};

export const createFileWorkflow = (driveId, folderId, file) => async (
  dispatch
) => {
  const tryItems = async () => {
    dispatch(setDriveLoading(true));
    const { folders } = await createFile(driveId, folderId, file);
    dispatch(setDriveFolders(folders));
  };

  const catchItems = (error) => {};

  const finalItems = () => {
    dispatch(setDriveLoading(false));
  };

  await useCatch(tryItems, catchItems, finalItems);
};
export const selectDriveItemWorkflow = (item) => async (dispatch) => {
  dispatch(setSelectedDriveItem({ ...item, type: item.type || null }));
  dispatch(setDriveLoading(false));
};
