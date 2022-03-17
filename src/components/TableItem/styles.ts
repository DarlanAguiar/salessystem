import styled from "styled-components";

export const TableLine = styled.tr``;

export const TableColumn = styled.td`
  padding: 4px 0;
`;

export const Category = styled.div<{ color: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => props.color};
`;

export const Value = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  position: relative;
  
`;

export const ButtonDeleteItem = styled.button`

position: absolute;
top: -5px;
right: 20px;
font-size: 20px;
color: red;
background-color: transparent;
border: 0;
cursor: pointer;
transition: .5s;
padding:2px;
display:flex;
align-items: center;
border-radius: 3px;

&:hover{
  background-color: red;
  color: white;
}
`
