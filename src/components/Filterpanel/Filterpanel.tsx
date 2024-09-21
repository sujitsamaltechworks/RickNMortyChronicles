import React from 'react'
import styled from '@emotion/styled'

type Props = {}

const FilterPanelContainer = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
`

const FilterItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const FilterSelect = styled.select`
    width: 200px;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Filterpanel = (props: Props) => {
    return (
        <FilterPanelContainer>
            <FilterItems>
                <label>STATUS</label>
                <FilterSelect
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FilterSelect>
            </FilterItems>
            <FilterItems>
                <label>GENDER</label>
                <FilterSelect
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FilterSelect>
            </FilterItems>
            <FilterItems>
                <label>TYPE</label>
                <FilterSelect
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FilterSelect>
            </FilterItems>
            <FilterItems>
                <label>SPECIES</label>
                <FilterSelect
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FilterSelect>
            </FilterItems>
            <FilterItems>
                <label>LOCATION</label>
                <FilterSelect
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FilterSelect>
            </FilterItems>
        </FilterPanelContainer>
    )
}

export default Filterpanel
