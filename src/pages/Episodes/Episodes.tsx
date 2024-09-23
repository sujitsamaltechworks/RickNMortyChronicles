import React, { useState } from 'react'
import styled from '@emotion/styled' // Assuming you have a hook for episodes
import {
    useGetCharactersByEpisode,
    useGetEpisodes,
} from '../../hooks/episode.hook'

interface Episode {
    id: number
    name: string
}

interface Props {}

const EpisodesContainer = styled.div`
    padding: 20px;
`

const FilterSelect = styled.select`
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
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

export default function EpisodesPage({}: Props) {
    const {
        data: episodes,
        isLoading: episodesLoading,
        error: episodesError,
    } = useGetEpisodes()

    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null)

    const {
        data: characters,
        isLoading: charactersLoading,
        error: charactersError,
    } = useGetCharactersByEpisode(selectedEpisode)

    return (
        <EpisodesContainer>
            {/* Handling loading and error states for episodes */}
            {episodesLoading && (
                <LoadingIndicator>Loading episodes...</LoadingIndicator>
            )}
            {episodesError && <ErrorText>Error loading episodes</ErrorText>}

            {!episodesLoading && !episodesError && episodes && (
                <FilterSelect
                    value={selectedEpisode || ''}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                >
                    <option value="">Select an episode</option>
                    {episodes.map((episode) => (
                        <option key={episode.id} value={episode.id}>
                            {episode.name}
                        </option>
                    ))}
                </FilterSelect>
            )}

            {/* Handle selected episode's characters */}
            {selectedEpisode && (
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
                            <h4>Characters in this episode:</h4>
                            {characters.map((character: any) => (
                                <CharacterItem key={character.id}>
                                    {character.name}
                                </CharacterItem>
                            ))}
                        </CharactersList>
                    )}
                </>
            )}
        </EpisodesContainer>
    )
}
