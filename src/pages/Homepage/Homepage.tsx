import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useGetAllCharacters } from '../../hooks/character.hook'
import Card from '../../components/Card/Card'
import Searchbar from '../../components/Searchbar/Searchbar'

interface HomepageProps {}

const Homepage = ({}: HomepageProps) => {
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState<string>('')
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>('')

    // Fetch characters based on debounced search text or page
    const { data, isLoading } = useGetAllCharacters(debouncedSearchText, page)

    // Destructure results and pagination info
    const characters = data?.results
    const info = data?.info // Info object for pagination, includes total pages

    // Debounce logic for search text
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchText(searchText)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchText])

    /**
     * @function handleSearchText
     * @param str search text from Searchbar component
     */
    const handleSearchText = (str: string) => {
        setSearchText(str)
        setPage(1) // Reset page to 1 when a new search is triggered
    }

    /**
     * @function handlePageClick
     * React Paginate event handler when a user clicks on a page number
     * @param data Pagination data from react-paginate (selected page index)
     */
    const handlePageClick = (data: { selected: number }) => {
        setPage(data.selected + 1) // react-paginate is zero-indexed, so we add 1
    }

    return (
        <div className="container">
            <div className="row">
                <Searchbar searchTextHandler={handleSearchText} />

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

            {/* Render react-paginate if pagination info is available */}
            {info && (
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={info.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
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
