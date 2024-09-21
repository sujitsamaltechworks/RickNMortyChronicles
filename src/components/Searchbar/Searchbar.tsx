import React from 'react'
import styled from '@emotion/styled'

type Props = {
    searchTextHandler: (e: string) => void
}

const SearchbarContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 16px 0;

    @media (min-width: 768px) {
        width: 50%;
    }
`

const Searchbar = ({ searchTextHandler }: Props) => {
    const handleSearchText = (e: string) => {
        searchTextHandler(e)
    }

    return (
        <SearchbarContainer>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="search-input"
                    placeholder="Search your favorite character"
                    onChange={(e) => handleSearchText(e.target.value)}
                />
            </div>
        </SearchbarContainer>
    )
}

export default Searchbar
