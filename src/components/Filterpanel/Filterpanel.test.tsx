import { render, screen, fireEvent } from '@testing-library/react'
import { useGetFilterOptions } from '../../hooks/filters.hook'
import FilterPanel from './Filterpanel'

jest.mock('../../hooks/filters.hook', () => ({
    useGetFilterOptions: jest.fn(),
}))

describe('FilterPanel', () => {
    const mockApplyFilters = jest.fn()
    const characterFilters = {
        statuses: ['Alive', 'Dead', 'Unknown'],
        genders: ['Male', 'Female', 'Genderless', 'Unknown'],
        species: ['Human', 'Alien'],
        types: ['Type1', 'Type2'],
    }

    beforeEach(() => {
        ;(useGetFilterOptions as jest.Mock).mockReturnValue({
            characterFilters,
        })
    })

    test('renders filter options', () => {
        render(<FilterPanel applyFilters={mockApplyFilters} />)

        expect(screen.getByText('FILTERS')).toBeInTheDocument()
        expect(screen.getByLabelText('STATUS')).toBeInTheDocument()
        expect(screen.getByLabelText('GENDER')).toBeInTheDocument()
        expect(screen.getByLabelText('SPECIES')).toBeInTheDocument()
        expect(screen.getByLabelText('TYPE')).toBeInTheDocument()
    })

    test('applies filters when Apply button is clicked', () => {
        render(<FilterPanel applyFilters={mockApplyFilters} />)

        fireEvent.change(screen.getByLabelText('STATUS'), {
            target: { value: 'Alive' },
        })
        fireEvent.change(screen.getByLabelText('GENDER'), {
            target: { value: 'Male' },
        })
        fireEvent.change(screen.getByLabelText('SPECIES'), {
            target: { value: 'Human' },
        })
        fireEvent.change(screen.getByLabelText('TYPE'), {
            target: { value: 'Type1' },
        })

        fireEvent.click(screen.getByText('Apply Filter'))

        expect(mockApplyFilters).toHaveBeenCalledWith({
            status: 'Alive',
            gender: 'Male',
            species: 'Human',
            type: 'Type1',
        })
    })

    test('resets filters when Reset button is clicked', () => {
        render(<FilterPanel applyFilters={mockApplyFilters} />)

        // Select filter values
        fireEvent.change(screen.getByLabelText('STATUS'), {
            target: { value: 'Dead' },
        })
        fireEvent.change(screen.getByLabelText('GENDER'), {
            target: { value: 'Female' },
        })

        fireEvent.click(screen.getByText('Reset Filters'))

        expect(mockApplyFilters).toHaveBeenCalledWith({
            status: '',
            gender: '',
            species: '',
            type: '',
        })
    })
})
