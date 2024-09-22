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

const LocationsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`

const LocationCard = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    word-break: break-all;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
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

export default function LocationPage({}: Props) {
    const { locations, loading: locationsLoading } = useGetLocations()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedLocation, setSelectedLocation] = useState<number | null>(
        null
    )
    const { characters } = useGetCharactersByLocation(selectedLocation)

    const filteredLocations: Location[] = locations.filter(
        (location: Location) =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <LocationsContainer>
            <SearchInput
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {locationsLoading ? (
                <LoadingIndicator>Loading locations...</LoadingIndicator>
            ) : (
                <LocationsGrid>
                    {filteredLocations.map((location) => (
                        <LocationCard
                            key={location.id}
                            onClick={() => setSelectedLocation(location.id)}
                        >
                            <h3>{location.name}</h3>
                        </LocationCard>
                    ))}
                </LocationsGrid>
            )}

            {selectedLocation && (
                <CharactersList>
                    <h4>Characters in this location:</h4>
                    {characters.map((character: any) => (
                        <CharacterItem key={character.id}>
                            {character.name}
                        </CharacterItem>
                    ))}
                </CharactersList>
            )}
        </LocationsContainer>
    )
}
