import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { ethers } from 'ethers'
import HedgrFactory from '../contracts/HedgrWalletFactory.json'
import HedgrWallet from '../contracts/HedgrWallet.json'
import { hedgrFactoryAddress } from './Wallet'
import AssetBalance from './AssetBalance'
import Button from './Button'
let provider = ethers.getDefaultProvider('kovan')

const web3 = new Web3(window.ethereum)

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

function WalletDetails() {
  const [userWallet, setUserWallet] = useState(null)
  const [snxBal, setSnxBal] = useState()
  const [ethBal, setEthBal] = useState()
  const [aEthBal, setAEthBal] = useState()
  const [susdDebt, setSusdDebt] = useState()
  const [stakeTxProcessing, toggleStakeTxProcessing] = useState(false)
  const [leverTxProcessing, toggleLeverTxProcessing] = useState(false)
  const [showLeverage, toggleShowLeverage] = useState(false)

  useEffect(() => {
    setInterval(() => {
      poll()
    }, 1000)
  }, [])

  const poll = async () => {
    const hedgrFactory = new web3.eth.Contract(
      HedgrFactory.abi,
      hedgrFactoryAddress,
    )
    const wallet = await hedgrFactory.methods
      .getUserWallet(window.web3.currentProvider.selectedAddress)
      .call()
    setUserWallet(wallet)
    console.log('wallet', wallet)

    const hedgrWallet = new web3.eth.Contract(HedgrWallet.abi, wallet)

    const snxBalance = await hedgrWallet.methods.getSnxBalance().call()
    console.log('snxbal', snxBalance)
    setSnxBal(snxBalance)

    const ethBalance = await hedgrWallet.methods.getEthBalance().call()
    console.log('ethbal', ethBalance)
    setEthBal(ethBalance)

    const aEthBalance = await hedgrWallet.methods.getAEthBalance().call()
    console.log('aethbal', aEthBalance)
    setAEthBal(aEthBalance)

    const synthDebt = await hedgrWallet.methods.getSynthDebt().call()
    console.log('synthDebt', synthDebt)
    setSusdDebt(synthDebt)
  }

  //   TODO: why won't web3 events take
  const stake = async () => {
    const hedgrWallet = new web3.eth.Contract(HedgrWallet.abi, userWallet)
    const hedgrWalletEthers = new ethers.Contract(
      userWallet,
      HedgrWallet.abi,
      provider,
    )
    toggleStakeTxProcessing(true)
    hedgrWalletEthers.on('Staked', (oldValue, newValue, event) => {
      toggleStakeTxProcessing(false)
      toggleShowLeverage(true)
    })

    await hedgrWallet.methods
      .stakeAndAllocate()
      .send({ from: window.web3.currentProvider.selectedAddress })
  }

  const lever = async () => {
    const hedgrWallet = new web3.eth.Contract(HedgrWallet.abi, userWallet)
    const hedgrWalletEthers = new ethers.Contract(
      userWallet,
      HedgrWallet.abi,
      provider,
    )
    toggleLeverTxProcessing(true)
    hedgrWalletEthers.on('Hedged', (oldValue, newValue, event) => {
      toggleLeverTxProcessing(false)
    })
    await hedgrWallet.methods
      .hedgeWithLeverage()
      .send({ from: window.web3.currentProvider.selectedAddress })
  }

  return (
    <Container>
      <Button big onClick={stake}>
        {stakeTxProcessing ? 'Processing...' : 'Stake Your SNX'}
      </Button>
      {showLeverage && (
        <Button big onClick={lever}>
          {leverTxProcessing ? 'Processing...' : 'Hedge & Lever!'}
        </Button>
      )}
      <AssetBalance label="SNX Balance" value={snxBal} />
      <AssetBalance label="ETH Balance" value={ethBal} />
      <AssetBalance label="aETH Balance" value={aEthBal} />
      <AssetBalance label="sUSD Debt" value={susdDebt} />
    </Container>
  )
}

export default WalletDetails
