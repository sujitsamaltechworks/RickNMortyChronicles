import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from '@emotion/styled'

import Episode from './EpisodeCard'

interface Character {
    id: number
    name: string
    status: string
    species: string
    gender: string
    origin?: {
        name: string
    }
    location?: {
        name: string
    }
    image: string
    episode: string[]
}

const CharacterDetailsContainer = styled.div`
    display: flex;
    gap: 48px;
    padding: 20px;
`

const CharacterImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
`

const CharacterDetailsSection = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-top: 32px;
`

const EpisodesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const CharacterDetails = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState<Character | null>(null)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(
                    `https://rickandmortyapi.com/api/character/${id}`
                )
                setCharacter(response.data)
            } catch (error) {
                console.error('Error fetching character:', error)
            }
        }

        fetchCharacter()
    }, [id])

    if (!character) {
        return <div>Loading...</div>
    }

    const episodeNumbers = character.episode
        .map((episode) => {
            const match = episode.match(/\/episode\/(\d+)/)
            return match ? parseInt(match[1]) : null
        })
        .filter(Boolean)

    return (
        <div className="container">
            <CharacterDetailsContainer>
                <div>
                    <CharacterImage
                        src={character.image}
                        alt={`${character.name} character image`}
                    />
                </div>
                <div>
                    <h2>{character.name}</h2>
                    <CharacterDetailsSection>
                        <p>
                            <strong>Status:</strong> {character.status}
                        </p>
                        <p>
                            <strong>Species:</strong> {character.species}
                        </p>
                        <p>
                            <strong>Gender:</strong> {character.gender}
                        </p>
                    </CharacterDetailsSection>
                    <h3>Origin</h3>
                    {character.origin && (
                        <CharacterDetailsSection>
                            <p>
                                <strong>Name:</strong> {character.origin.name}
                            </p>
                        </CharacterDetailsSection>
                    )}
                    <h3>Current Location</h3>
                    {character.location && (
                        <CharacterDetailsSection>
                            <p>
                                <strong>Name:</strong> {character.location.name}
                            </p>
                        </CharacterDetailsSection>
                    )}
                </div>
            </CharacterDetailsContainer>
            <h3>Episodes</h3>
            <EpisodesSection>
                {episodeNumbers.map((episode: any) => (
                    <Episode key={episode} episodes={[episode]} />
                ))}
            </EpisodesSection>
        </div>
    )
}

export default CharacterDetails
