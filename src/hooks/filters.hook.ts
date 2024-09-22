import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '../api/api'

// Function to fetch all pages data of a paginated data
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

// Fetch all filters results to populate in the dropdown
export const useGetFilterOptions = () => {
    // Fetch all available locations
    const locationsQuery = useQuery({
        queryKey: ['locations'],
        queryFn: async () => await fetchAllPages('/location'),
    })

    // Fetch all available episodes
    const episodesQuery = useQuery({
        queryKey: ['episodes'],
        queryFn: async () => await fetchAllPages('/episode'),
    })

    // Fetch character filters (status, species, gender, type)
    const characterFiltersQuery = useQuery({
        queryKey: ['characterFilters'],
        queryFn: async () => {
            const { data } = await apiInstance.get('/character')
            const statuses = ['Alive', 'Dead', 'unknown']
            const genders = ['Male', 'Female', 'Genderless', 'unknown']
            const species = Array.from(
                new Set(data.results.map((char: any) => char.species))
            )
            const types = Array.from(
                new Set(
                    data.results.map((char: any) => char.type).filter(Boolean)
                )
            )
            return { statuses, genders, species, types }
        },
    })

    return {
        locations: locationsQuery.data,
        episodes: episodesQuery.data,
        characterFilters: characterFiltersQuery.data,
    }
}
