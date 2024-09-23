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

// Hook to fetch all available locations
export const useGetLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: async () => await fetchAllPages('/location'),
    })
}

// Hook to fetch all characters by location ID
export const useGetCharactersByLocation = (locationId: number | null) => {
    return useQuery({
        queryKey: ['charactersByLocation', locationId],
        queryFn: async () => {
            if (locationId) {
                const { data } = await apiInstance.get(
                    `/location/${locationId}`
                )
                const characterPromises = data.residents.map((url: string) =>
                    apiInstance.get(url)
                )
                const characterResponses = await Promise.all(characterPromises)
                return characterResponses.map((res) => res.data)
            } else {
                return []
            }
        },
        enabled: !!locationId, // Ensures the query runs only when locationId is provided
    })
}
