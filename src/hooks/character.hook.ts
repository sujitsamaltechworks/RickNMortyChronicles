import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiInstance } from '../api/api'

export const useGetAllCharacters = (page: number) => {
    const query = useQuery({
        queryKey: ['characters'],
        queryFn: async () => {
            const { data } = await apiInstance.get(`/character/?page=${page}`)
            return data.results
        },
    })
    return query
}
