import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useGetFilterOptions } from '../../hooks/filters.hook'

const FilterPanelContainer = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
`

const FilterItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const FilterSelect = styled.select`
    width: 200px;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const ApplyButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 16px;

    &:hover {
        background-color: #0056b3;
    }
`

const ResetButton = styled.button`
    padding: 10px 20px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 16px;

    &:hover {
        background-color: darkred;
    }
`

const Heading = styled.h4`
    text-align: center;
    margin-bottom: 16px;
    font-weight: 600;
`
interface CharacterFilters {
    statuses: string[]
    genders: string[]
    species: string[]
    types: string[]
}

interface Episode {
    id: number
    name: string
}

interface Location {
    id: number
    name: string
}

interface FilterOptions {
    locations: Location[]
    episodes: Episode[]
    characterFilters: CharacterFilters
}

interface FilterPanelProps {
    applyFilters: (filters: {
        status: string
        gender: string
        species: string
        type: string
        location: string
        episode: string
    }) => void
}

export default function Filterpanel({ applyFilters }: FilterPanelProps) {
    const { locations, episodes, characterFilters } =
        useGetFilterOptions() as FilterOptions

    // Storing selected values
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [selectedGender, setSelectedGender] = useState<string>('')
    const [selectedSpecies, setSelectedSpecies] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedLocation, setSelectedLocation] = useState<string>('')
    const [selectedEpisode, setSelectedEpisode] = useState<string>('')

    // Function to handle apply filter button click
    const handleApplyFilters = () => {
        const filters = {
            status: selectedStatus,
            gender: selectedGender,
            species: selectedSpecies,
            type: selectedType,
            location: selectedLocation,
            episode: selectedEpisode,
        }
        applyFilters(filters)
    }

    // Function to handle reset button click
    const handleResetFilters = () => {
        setSelectedStatus('')
        setSelectedGender('')
        setSelectedSpecies('')
        setSelectedType('')
        setSelectedLocation('')
        setSelectedEpisode('')
        applyFilters({
            status: '',
            gender: '',
            species: '',
            type: '',
            location: '',
            episode: '',
        })
    }

    return (
        <>
            <Heading>FILTERS</Heading>
            <FilterPanelContainer>
                {/* Status Filter */}
                <FilterItems>
                    <label htmlFor="status">STATUS</label>
                    <FilterSelect
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {characterFilters?.statuses?.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Gender Filter */}
                <FilterItems>
                    <label htmlFor="gender">GENDER</label>
                    <FilterSelect
                        id="gender"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {characterFilters?.genders?.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Species Filter */}
                <FilterItems>
                    <label htmlFor="species">SPECIES</label>
                    <FilterSelect
                        id="species"
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {characterFilters?.species?.map((species) => (
                            <option key={species} value={species}>
                                {species}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Type Filter */}
                <FilterItems>
                    <label htmlFor="type">TYPE</label>
                    <FilterSelect
                        id="type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {characterFilters?.types?.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Location Filter */}
                <FilterItems>
                    <label htmlFor="location">LOCATION</label>
                    <FilterSelect
                        id="location"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {locations?.map((location) => (
                            <option key={location.id} value={location.name}>
                                {location.name}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Episode Filter */}
                <FilterItems>
                    <label htmlFor="episode">EPISODE</label>
                    <FilterSelect
                        id="episode"
                        value={selectedEpisode}
                        onChange={(e) => setSelectedEpisode(e.target.value)}
                    >
                        <option value="">Choose</option>
                        {episodes?.map((episode) => (
                            <option key={episode.id} value={episode.name}>
                                {episode.name}
                            </option>
                        ))}
                    </FilterSelect>
                </FilterItems>

                {/* Apply Filters Button */}
                <ApplyButton onClick={handleApplyFilters}>
                    Apply Filter
                </ApplyButton>

                {/* Reset Filters Button */}
                <ResetButton onClick={handleResetFilters}>
                    Reset Filters
                </ResetButton>
            </FilterPanelContainer>
        </>
    )
}
