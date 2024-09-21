import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '../api/api'

export const useGetAllCharacters = (
    searchText?: string,
    page: number = 1,
    status?: string,
    gender?: string,
    species?: string,
    type?: string
) => {
    return useQuery({
        queryKey: [
            'characters',
            searchText,
            page,
            status,
            gender,
            species,
            type,
        ], // Include all parameters in the query key
        queryFn: async () => {
            // Use URLSearchParams to dynamically build the query string
            const params = new URLSearchParams()

            if (page) params.append('page', page.toString())
            if (searchText) params.append('name', searchText)
            if (status) params.append('status', status)
            if (gender) params.append('gender', gender)
            if (species) params.append('species', species)
            if (type) params.append('type', type)

            const { data } = await apiInstance.get(
                `/character/?${params.toString()}`
            )
            return {
                results: data.results,
                info: data.info, // Return pagination info (e.g., next and prev pages)
            }
        },
    })
}
