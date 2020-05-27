import React, { useState } from 'react'
import styled from 'styled-components'

const ButtonHolder = styled.div`
  width: ${({big}) => big ? "150px" : "120px"};
  height: 48px;
  text-align: center;
  margin-top: 30px;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ButtonText = styled.div`
  font-size: 18px;
  font-weight: bold;
`

function Button({ children, onClick, big }) {
  return (
    <ButtonHolder big onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </ButtonHolder>
  )
}

export default Button
