import React, { useState } from 'react'
import { useGetAllCharacters } from '../../hooks/character.hook'
import Card from '../../components/Card/Card'

interface HomepageProps {}

const Homepage = ({}: HomepageProps) => {
    const [page, setPage] = useState(1)
    const { data: characters } = useGetAllCharacters(page)
    return (
        <div className="container">
            <div className="row">
                {characters?.map((character: any) => (
                    <div
                        className="col-xs-12 col-md-6 col-xl-4 col-xxl-3"
                        key={character.id}
                    >
                        <Card
                            id={character.id}
                            name={character.name}
                            status={character.status}
                            image={character.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Homepage
