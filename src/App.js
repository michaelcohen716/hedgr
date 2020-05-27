import React, { useState } from 'react'
import styled from 'styled-components'
import Wallet from './components/Wallet'
import Button from './components/Button'

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(28, 26, 40);
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  color: white;
`

const TitleText = styled.div`
  font-size: 44px;
  font-weight: bold;
`

const ExplainerText = styled.div`
  font-size: 24px;
  margin-top: 30px;
  width: 400px;
  letter-spacing: 0.5px;
`

const Explainers = [
  'Astute SNX Stakers hedge their exposure to the debt pool outside of the Synthetix ecosystem',
  'Recently, iETH liquidity incentives have encouraged ETH bulls to build leveraged external ETH positions',
  'The few extra transactions required to build leverage are simple enough, but this use case represents an opportunity for smart contract based wallets to demonstrate their value',
  'Stakers should have a variety of hedging strategies available to them in the same self-contained wallet where they interact with Synthetix',
  'Press \'Next\' to initiate a smart contract wallet (seeded with 50 SNX) to test the all-in-one staking and hedging wallet: Hedgr' 

]

function App() {
  const [step, incrementStep] = useState(0)
  const [stage, incrementStage] = useState(0)

  const increment = () => {
    if(step < 4){
      incrementStep(step + 1)
    } else {
      incrementStage(stage + 1)
    }
  } 

  return (
    <OuterContainer>
      <TitleText>Hedgr</TitleText>
      {stage === 0 ? (
        <React.Fragment>
          <ExplainerText>{Explainers[step]}</ExplainerText>
          <Button onClick={increment}>
            Next
          </Button>
        </React.Fragment>
      ) : (
        <Wallet />
      )}
    </OuterContainer>
  )
}

export default App
