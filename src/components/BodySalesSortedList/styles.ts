import styled from "styled-components";     


export const TableLine = styled.tr`


`

export const TableCulumn = styled.td<{color?: string}>`
background-color: ${props => props.color? props.color : "ligthblue"};

`