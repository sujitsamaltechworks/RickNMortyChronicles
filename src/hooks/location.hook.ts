// hooks/locations.hook.ts
import { useState, useEffect } from 'react'
import axios from 'axios'

export const useGetLocations = () => {
    const [locations, setLocations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(
                    'https://rickandmortyapi.com/api/location'
                )
                setLocations(response.data.results)
            } catch (error) {
                console.error('Error fetching locations:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLocations()
    }, [])

    return { locations, loading }
}

export const useGetCharactersByLocation = (locationId: number | null) => {
    const [characters, setCharacters] = useState<any[]>([])

    useEffect(() => {
        const fetchCharacters = async () => {
            if (locationId) {
                try {
                    const response = await axios.get(
                        `https://rickandmortyapi.com/api/location/${locationId}`
                    )
                    const characterPromises = response.data.residents.map(
                        (url: string) => axios.get(url)
                    )
                    const characterResponses =
                        await Promise.all(characterPromises)
                    setCharacters(characterResponses.map((res) => res.data))
                } catch (error) {
                    console.error('Error fetching characters:', error)
                }
            }
        }

        fetchCharacters()
    }, [locationId])

    return { characters }
}
