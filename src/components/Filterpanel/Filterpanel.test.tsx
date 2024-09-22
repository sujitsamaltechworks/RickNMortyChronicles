import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filterpanel from './Filterpanel'

// Mocking the hook to return dummy filter options
jest.mock('../../hooks/filters.hook', () => ({
    useGetFilterOptions: () => ({
        locations: [
            { id: 1, name: 'Earth' },
            { id: 2, name: 'Mars' },
        ],
        episodes: [
            { id: 1, name: 'Pilot' },
            { id: 2, name: 'Rick Potion No. 9' },
        ],
        characterFilters: {
            statuses: ['Alive', 'Dead', 'Unknown'],
            genders: ['Male', 'Female'],
            species: ['Human', 'Alien'],
            types: ['Type1', 'Type2'],
        },
    }),
}))

describe('Filterpanel Component', () => {
    const applyFilters = jest.fn()

    beforeEach(() => {
        render(<Filterpanel applyFilters={applyFilters} />)
    })

    it('renders all filter labels and buttons', () => {
        expect(screen.getByLabelText('STATUS')).toBeInTheDocument()
        expect(screen.getByLabelText('GENDER')).toBeInTheDocument()
        expect(screen.getByLabelText('SPECIES')).toBeInTheDocument()
        expect(screen.getByLabelText('TYPE')).toBeInTheDocument()
        expect(screen.getByLabelText('LOCATION')).toBeInTheDocument()
        expect(screen.getByLabelText('EPISODE')).toBeInTheDocument()

        expect(screen.getByText('Apply Filter')).toBeInTheDocument()
        expect(screen.getByText('Reset Filters')).toBeInTheDocument()
    })

    it('applies filters when "Apply Filter" button is clicked', () => {
        fireEvent.change(screen.getByLabelText('STATUS'), {
            target: { value: 'Alive' },
        })
        fireEvent.change(screen.getByLabelText('GENDER'), {
            target: { value: 'Male' },
        })
        fireEvent.change(screen.getByLabelText('SPECIES'), {
            target: { value: 'Human' },
        })
        fireEvent.change(screen.getByLabelText('LOCATION'), {
            target: { value: 'Earth' },
        })
        fireEvent.change(screen.getByLabelText('EPISODE'), {
            target: { value: 'Pilot' },
        })

        fireEvent.click(screen.getByText('Apply Filter'))

        expect(applyFilters).toHaveBeenCalledWith({
            status: 'Alive',
            gender: 'Male',
            species: 'Human',
            type: '',
            location: 'Earth',
            episode: 'Pilot',
        })
    })

    it('resets filters when "Reset Filters" button is clicked', () => {
        fireEvent.change(screen.getByLabelText('STATUS'), {
            target: { value: 'Alive' },
        })
        fireEvent.change(screen.getByLabelText('GENDER'), {
            target: { value: 'Male' },
        })

        fireEvent.click(screen.getByText('Reset Filters'))

        expect(screen.getByLabelText('STATUS')).toHaveValue('')
        expect(screen.getByLabelText('GENDER')).toHaveValue('')
        expect(screen.getByLabelText('SPECIES')).toHaveValue('')
        expect(screen.getByLabelText('LOCATION')).toHaveValue('')
        expect(screen.getByLabelText('EPISODE')).toHaveValue('')

        expect(applyFilters).toHaveBeenCalledWith({
            status: '',
            gender: '',
            species: '',
            type: '',
            location: '',
            episode: '',
        })
    })
})
