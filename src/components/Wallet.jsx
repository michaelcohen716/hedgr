import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { ethers } from "ethers";
import Button from './Button'
import WalletDetails from './WalletDetails'
import HedgrFactory from '../contracts/HedgrWalletFactory.json'

export const hedgrFactoryAddress = '0xf8F5f25691672D99d47ea49ca2a8F5938CD04bb2'
let provider = ethers.getDefaultProvider("kovan");

const web3 = new Web3(window.ethereum)

function Wallet() {
  const [stage, setStage] = useState(0)
  const [txProcessing, toggleTxProcessing] = useState(false)

  const connect = async () => {
    await window.ethereum.enable()
    setStage(stage + 1)
  }

  // TODO: why won't web3 events catch?
  const initiateWallet = async () => {
    const hedgrFactory = new web3.eth.Contract(
      HedgrFactory.abi,
      hedgrFactoryAddress,
    )
    const hedgrFactoryEthers = new ethers.Contract(hedgrFactoryAddress, HedgrFactory.abi, provider);
    hedgrFactoryEthers.on("WalletCreated", (oldValue, newValue, event) => {
        console.log('evt', event)
        toggleTxProcessing(false)
        setStage(stage + 1);
    })    
    toggleTxProcessing(true)
    await hedgrFactory.methods
      .initiate()
      .send({ from: window.web3.currentProvider.selectedAddress })
  }


  if (stage === 0) {
    return <Button onClick={connect}>Connect</Button>
  }

  if (stage === 1) {
    return (
      <Button big onClick={initiateWallet}>
          {txProcessing ? "Processing..." : "Initiate Wallet"}
      </Button>
    )
  }

  return <WalletDetails />
}

export default Wallet
