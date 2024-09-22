import React from 'react'
import styled from '@emotion/styled'
import { useGetFilterOptions } from '../../hooks/filters.hook'

type Props = {}

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

const Filterpanel = () => {
    const { locations, episodes, characterFilters } = useGetFilterOptions()

    return (
        <FilterPanelContainer>
            {/* Status Filter */}
            <FilterItems>
                <label>STATUS</label>
                <FilterSelect>
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
                <FilterSelect>
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
                <FilterSelect>
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
                <FilterSelect>
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
                <FilterSelect>
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
                <FilterSelect>
                    {episodes?.map((episode: any) => (
                        <option key={episode.id} value={episode.name}>
                            {episode.name}
                        </option>
                    ))}
                </FilterSelect>
            </FilterItems>
        </FilterPanelContainer>
    )
}

export default Filterpanel
