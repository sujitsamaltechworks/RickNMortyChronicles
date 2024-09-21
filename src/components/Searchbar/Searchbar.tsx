import React from 'react'
import styled from '@emotion/styled'

type Props = {
    searchTextHandler: (e: string) => void
}

const SearchbarContainer = styled.div`
    width: 90%;
    margin-left: 32px;
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
