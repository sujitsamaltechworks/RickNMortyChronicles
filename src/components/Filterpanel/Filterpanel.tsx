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

const Filterpanel = ({
    applyFilters,
}: {
    applyFilters: (filters: any) => void
}) => {
    const { locations, episodes, characterFilters } = useGetFilterOptions()

    // States to store selected values
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
        applyFilters(filters) // Call the applyFilters function with the selected filters
    }

    // Function to handle reset button click
    const handleResetFilters = () => {
        setSelectedStatus('')
        setSelectedGender('')
        setSelectedSpecies('')
        setSelectedType('')
        setSelectedLocation('')
        setSelectedEpisode('')

        // Call applyFilters with empty filters to reset data
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
        <FilterPanelContainer>
            {/* Status Filter */}
            <FilterItems>
                <label>STATUS</label>
                <FilterSelect
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Choose</option>
                    {characterFilters?.statuses?.map((status: string) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </FilterSelect>
            </FilterItems>

            {/* Gender Filter */}
            <FilterItems>
                <label>GENDER</label>
                <FilterSelect
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                >
                    <option value="">Choose</option>
                    {characterFilters?.genders?.map((gender: string) => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                    ))}
                </FilterSelect>
            </FilterItems>

            {/* Species Filter */}
            <FilterItems>
                <label>SPECIES</label>
                <FilterSelect
                    value={selectedSpecies}
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                >
                    <option value="">Choose</option>
                    {(characterFilters?.species as string[])?.map(
                        (species: string) => (
                            <option key={species} value={species}>
                                {species}
                            </option>
                        )
                    )}
                </FilterSelect>
            </FilterItems>

            {/* Type Filter */}
            <FilterItems>
                <label>TYPE</label>
                <FilterSelect
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Choose</option>
                    {(characterFilters?.types as string[])?.map(
                        (type: string) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        )
                    )}
                </FilterSelect>
            </FilterItems>

            {/* Location Filter */}
            <FilterItems>
                <label>LOCATION</label>
                <FilterSelect
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="">Choose</option>
                    {locations?.map((location: any) => (
                        <option key={location.id} value={location.name}>
                            {location.name}
                        </option>
                    ))}
                </FilterSelect>
            </FilterItems>

            {/* Episode Filter */}
            <FilterItems>
                <label>EPISODE</label>
                <FilterSelect
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(e.target.value)}
                >
                    <option value="">Choose</option>
                    {episodes?.map((episode: any) => (
                        <option key={episode.id} value={episode.name}>
                            {episode.name}
                        </option>
                    ))}
                </FilterSelect>
            </FilterItems>

            {/* Apply Filter Button */}
            <ApplyButton onClick={handleApplyFilters}>Apply Filter</ApplyButton>

            {/* Reset Filters Button */}
            <ResetButton onClick={handleResetFilters}>
                Reset Filters
            </ResetButton>
        </FilterPanelContainer>
    )
}

export default Filterpanel
