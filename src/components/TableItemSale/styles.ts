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
`;

export const ButtonDeleteItem = styled.button`
padding: 0;
font-size: 20px;
color: red;
border: 0;
background-color: transparent;
display: flex;
align-items: center;
border-radius: 3px;

&:hover {
  background-color: red;
  color: white;
}



`
