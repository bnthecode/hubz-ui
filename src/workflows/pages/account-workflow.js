import { setAccounts } from "../../redux/actions/pages/accountActions";
import {
  createAccount,
  getAccountAccessToken,
  getAccountsByType,
} from "../../services/http/accounts-http";

export const createAccountWorkflow = (public_token, metadata, homeId) => async (
  dispatch
) => {
  const { institution } = metadata;
  const access_token = await getAccountAccessToken(homeId, public_token);
  const generatedAccount = { access_token, name: institution.name };
  const accounts = await createAccount(generatedAccount, homeId);
  dispatch(setAccounts(accounts));
};

export const filterAccountsWorkflow = (value, homeId) => async (dispatch) => {
  const accounts = await getAccountsByType(homeId, value);
  dispatch(setAccounts(accounts));
};
