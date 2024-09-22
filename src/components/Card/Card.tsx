import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

interface Props {
    id: number
    name: string
    status: string
    image: string
}

const CardContainer = styled.div`
    margin: 16px;
    width: 18rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 90%;
`

export default function Card({ id, name, status, image }: Props) {
    return (
        <CardContainer className="card">
            <img
                src={image}
                className="card-img-top"
                alt={`${name} character image`}
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                    Status:{' '}
                    {status === 'Alive'
                        ? '🟢 Alive'
                        : status === 'Dead'
                          ? '🔴 Dead'
                          : status}
                </p>
                <Link to={`/character/${id}`} className="btn btn-primary">
                    View
                </Link>
            </div>
        </CardContainer>
    )
}
