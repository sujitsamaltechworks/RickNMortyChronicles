import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
    useGetCharactersByLocation,
    useGetLocations,
} from '../../hooks/location.hook'

interface Location {
    id: number
    name: string
}

interface Props {}

const LocationsContainer = styled.div`
    padding: 20px;
`

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
`

const FilterSelect = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23999' d='M2 0L0 2h4zM0 3l2 2 2-2z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 10px;
    cursor: pointer;
`

const CharactersList = styled.div`
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
`

const CharacterItem = styled.div`
    padding: 5px;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: none;
    }
`

const LoadingIndicator = styled.div`
    text-align: center;
    margin-top: 20px;
`

const ErrorText = styled.div`
    color: red;
    text-align: center;
    margin-top: 20px;
`

export default function LocationPage({}: Props) {
    const {
        data: locations,
        isLoading: locationsLoading,
        error: locationsError,
    } = useGetLocations()
    const [selectedLocation, setSelectedLocation] = useState<number | null>(
        null
    )
    const {
        data: characters,
        isLoading: charactersLoading,
        error: charactersError,
    } = useGetCharactersByLocation(selectedLocation)

    return (
        <LocationsContainer>
            {/* Handle loading and error states for locations */}
            {locationsLoading && (
                <LoadingIndicator>Loading locations...</LoadingIndicator>
            )}
            {locationsError && <ErrorText>Error loading locations</ErrorText>}

            {!locationsLoading && !locationsError && locations && (
                <FilterSelect
                    value={selectedLocation || ''}
                    onChange={(e) =>
                        setSelectedLocation(Number(e.target.value))
                    }
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </FilterSelect>
            )}

            {/* Handle selected location's characters */}
            {selectedLocation && (
                <>
                    {charactersLoading && (
                        <LoadingIndicator>
                            Loading characters...
                        </LoadingIndicator>
                    )}
                    {charactersError && (
                        <ErrorText>Error loading characters</ErrorText>
                    )}

                    {characters && !charactersLoading && !charactersError && (
                        <CharactersList>
                            <h4>Characters in this location:</h4>
                            {characters.map((character: any) => (
                                <CharacterItem key={character.id}>
                                    {character.name}
                                </CharacterItem>
                            ))}
                        </CharactersList>
                    )}
                </>
            )}
        </LocationsContainer>
    )
}
