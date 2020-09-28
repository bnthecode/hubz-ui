import http from "./http-config";
export const getAccountAccessToken = async (homeId, public_token) => {
  const {
    data: { access_token },
  } = await http.post(`/api/homes/${homeId}/accounts/access_token`, {
    public_token: public_token,
  });
  return access_token;
};

export const createAccount = async (newAcct, homeId) => {
  const {
    data: { accounts },
  } = await http.post(`/api/homes/${homeId}/accounts`, {
    account: { name: newAcct.name, token: newAcct.access_token },
  });
  return accounts;
};

export const getAccounts = async (homeId) => {
  const {
    data: { accounts },
  } = await http.get(`/api/homes/${homeId}/accounts`);
  return accounts;
};

export const getAccountsByType = async (homeId, sortType) => {
  const {
    data: { accounts },
  } = await http.get(`/api/homes/${homeId}/accounts/?sort_type=${sortType}`);
  return accounts;
};
