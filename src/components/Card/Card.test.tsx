import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Card from './Card'

describe('Card Component', () => {
    const mockProps = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        image: 'https://example.com/rick.png',
    }

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Card {...mockProps} />
            </MemoryRouter>
        )
    })

    it('renders the character image', () => {
        const img = screen.getByAltText(`${mockProps.name} character image`)
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', mockProps.image)
    })

    it('renders the character name', () => {
        expect(screen.getByText(mockProps.name)).toBeInTheDocument()
    })

    it('renders the character status', () => {
        // Using a regex matcher to match the status text
        expect(screen.getByText(/🟢 Alive/i)).toBeInTheDocument()
    })

    it('renders the link to the character detail page', () => {
        const link = screen.getByRole('link', { name: /view/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', `/character/${mockProps.id}`)
    })
})
