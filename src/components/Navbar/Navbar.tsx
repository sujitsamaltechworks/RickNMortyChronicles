import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'

type Props = {}

const Container = styled.div`
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

const Logo = styled.img`
    width: 200px;
    height: 50px;
`

const LinkPages = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

const LinkItem = styled(Link)`
    color: black;
    text-decoration: none;
    position: relative;
    padding: 8px 12px;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: darkgreen;
        bottom: -2px;
        left: 0;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    &.active::after {
        opacity: 1;
    }

    @media (max-width: 768px) {
        flex: 1 1 auto;
        text-align: center;
        padding: 8px;
    }
`

export default function Navbar({}: Props) {
    const location = useLocation()

    return (
        <Container className="container">
            <div>
                <Link to="/">
                    <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7V9pl8mqRXUhx1WxaszmtWPScOnpyEAQCw&s" />
                </Link>
            </div>
            <LinkPages>
                <LinkItem
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                >
                    Characters
                </LinkItem>
                <LinkItem
                    to="/locations"
                    className={
                        location.pathname === '/locations' ? 'active' : ''
                    }
                >
                    Locations
                </LinkItem>
                <LinkItem
                    to="/episodes"
                    className={
                        location.pathname === '/episodes' ? 'active' : ''
                    }
                >
                    Episodes
                </LinkItem>
            </LinkPages>
        </Container>
    )
}
