import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import styled from '@emotion/styled'
import { useGetAllCharacters } from '../../hooks/character.hook'
import Card from '../../components/Card/Card'
import Searchbar from '../../components/Searchbar/Searchbar'
import Filterpanel from '../../components/Filterpanel/Filterpanel'

interface HomepageProps {}

const Headingh1 = styled.h1`
    text-align: center;
`

const Homepage = ({}: HomepageProps) => {
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState<string>('')
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>('')
    const [filters, setFilters] = useState({
        status: '',
        gender: '',
        species: '',
        type: '',
        location: '',
        episode: '',
    })

    // Fetch characters based on debounced search text, page, and filters
    const { data, isLoading } = useGetAllCharacters(
        debouncedSearchText,
        page,
        filters.status,
        filters.gender,
        filters.species,
        filters.type,
    )

    // Destructure results and pagination info
    const characters = data?.results
    const info = data?.info

    // Debounce for search text
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchText(searchText)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchText])

    const handleSearchText = (str: string) => {
        setSearchText(str)
        setPage(1) // Reset page to 1 when a new search is triggered
    }

    const handlePageClick = (data: { selected: number }) => {
        setPage(data.selected + 1)
    }

    const handleApplyFilters = (filters: any) => {
        setFilters(filters) // Update the filters state
        setPage(1) // Reset page to 1 when filters are applied
    }

    // Determine pagination settings based on window size
    const isSmallScreen = window.innerWidth < 768
    const marginPagesDisplayed = isSmallScreen ? 0 : 2
    const pageRangeDisplayed = isSmallScreen ? 0 : 3

    return (
        <div className="container">
            <div className="row">
                <Headingh1>CHARACTERS</Headingh1>
                <Searchbar searchTextHandler={handleSearchText} />
                <Filterpanel applyFilters={handleApplyFilters} />

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    characters?.map((character: any) => (
                        <div
                            className="col-xs-12 col-md-6 col-xl-4 col-xxl-3"
                            key={character.id}
                        >
                            <Card
                                id={character.id}
                                name={character.name}
                                status={character.status}
                                image={character.image}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {info && (
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={info.pages}
                    marginPagesDisplayed={marginPagesDisplayed}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onPageChange={handlePageClick}
                    forcePage={page - 1}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            )}
        </div>
    )
}

export default Homepage
