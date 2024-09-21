import React from 'react'
import styled from '@emotion/styled'

type Props = {}

const Container = styled.div`
    background-color: #fbfbfb;
    padding: 16px 8%;
`

export default function Navbar({}: Props) {
    return (
        <Container>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7V9pl8mqRXUhx1WxaszmtWPScOnpyEAQCw&s"
                    width="200"
                    height="50"
                />
            </div>
            <div></div>
        </Container>
    )
}
