import styled from '@emotion/styled'

const EpisodeCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
`

const EpisodeNumberTag = styled.span`
    background-color: #f0f0f0;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin: 5px;
`

interface EpisodeProps {
    episodes: number[]
}

const Episode = ({ episodes }: EpisodeProps) => (
    <EpisodeCard>
        {episodes.map((episode) => (
            <EpisodeNumberTag key={episode}>{episode}</EpisodeNumberTag>
        ))}
    </EpisodeCard>
)

export default Episode
