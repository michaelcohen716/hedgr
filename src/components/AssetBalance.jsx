import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Label = styled.div`
  font-size: 24px;
  color: #808080;
  margin-bottom: 6px;
`

const Value = styled.div`
  font-size: 32px;
`

function AssetBalance({ label, value }) {
  useEffect(() => {

  }, [label, value])  
  return (
    <Holder>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Holder>
  )
}

export default AssetBalance
