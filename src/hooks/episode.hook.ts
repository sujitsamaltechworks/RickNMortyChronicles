import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '../api/api'

// Function to fetch all pages of paginated data
const fetchAllPages = async (endpoint: string) => {
    let allResults: any[] = []
    let nextUrl = endpoint

    while (nextUrl) {
        const { data } = await apiInstance.get(nextUrl)
        allResults = [...allResults, ...data.results]
        nextUrl = data.info?.next || null
    }

    return allResults
}

// Fetch all available episodes
export const useGetEpisodes = () => {
    return useQuery({
        queryKey: ['episodes'],
        queryFn: async () => await fetchAllPages('/episode'),
    })
}

// Fetch all characters by episode ID
export const useGetCharactersByEpisode = (episodeId: number | null) => {
    return useQuery({
        queryKey: ['charactersByEpisode', episodeId],
        queryFn: async () => {
            if (episodeId) {
                const { data } = await apiInstance.get(`/episode/${episodeId}`)
                const characterPromises = data.characters.map((url: string) =>
                    apiInstance.get(url)
                )
                const characterResponses = await Promise.all(characterPromises)
                return characterResponses.map((res) => res.data)
            } else {
                return []
            }
        },
        enabled: !!episodeId,
    })
}
