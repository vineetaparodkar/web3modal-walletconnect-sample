import * as actionTypes from "./web3-types";

export const web3Login = (account, provider, web3Modal) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      account: account,
      provider: provider,
      web3Modal: web3Modal,
    },
  };
};

export const web3Logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
