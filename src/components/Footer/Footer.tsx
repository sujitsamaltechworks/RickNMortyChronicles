import React from 'react'
import styled from '@emotion/styled'

type Props = {}

const FooterContainer = styled.footer`
    position: sticky;
    height: 150px;
    width: 100%;
    background-color: black;
    color: white;
`

export default function Footer({}: Props) {
    return <FooterContainer>Footer</FooterContainer>
}
