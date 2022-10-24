import * as actionTypes from "./web3-types";

const INITIAL_STATE = {
  provider: null,
  account: null,
  web3Modal: null,
};

const web3LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        provider: action.payload.provider,
        account: action.payload.account,
        web3Modal: action.payload.web3Modal,
      };

    case actionTypes.LOGOUT:
      return {
        provider: null,
        account: null,
        web3Modal: null,
      };
    default:
      return state;
  }
};

export default web3LoginReducer;
