import React from "react";
import { connect } from "react-redux";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { useNavigate } from "react-router";

import { web3Login } from "../../redux/web3Context/web3-actions";
import { RPC_URL, CHAIN_ID } from "../../config/index";
import "./Login.css";

const Login = ({ provider, web3Modal, web3Login }) => {
  const navigate = useNavigate();

  const providerOptions = {
    // Example with injected providers
    injected: {
      display: {
        name: "Injected",
        description: "Connect with the provider in your Browser",
      },
      package: null,
    },
    // Example with WalletConnect provider
    walletconnect: {
      display: {
        name: "Mobile",
        description: "Scan qrcode with your mobile wallet",
      },
      package: WalletConnectProvider,
      options: {
        rpc: {
          [CHAIN_ID]: RPC_URL,
        },
      },
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const login = async () => {
    try {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);

      if (provider != null) {
        //subscribe to account changed
        provider.on("accountChanged", (accounts) => {
          console.log("accounts changed", accounts);
        });

        //subscribe to chainId changed
        provider.on("chainChanged", (chainId) => {
          console.log("accounts changed", chainId);
        });

        //subscribe to session disconnect
        provider.on("disconnect", (code, reason) => {
          console.log("reason code", code, reason);
          navigate("/home");
        });
      }

      web3Login(accounts[0], provider, web3Modal);
      navigate("/dashboard");
    } catch (e) {
      console.log("errpr log", e);
      provider && provider.wc.connected && provider.close();
      navigate("/home");
    }
  };
  return (
    <div className="login">
      <div className="title">Connect your Wallet</div>
      <form>
        <div className="btn-div">
          <div onClick={login} className="btn-class">
            click here
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    provider: state.web3.provider,
    web3Modal: state.web3.web3Modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    web3Login: (account, provider, web3Modal) =>
      dispatch(web3Login(account, provider, web3Modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
