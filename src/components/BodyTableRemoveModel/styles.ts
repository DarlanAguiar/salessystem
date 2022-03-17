import styled from "styled-components";

export const ContainerTr = styled.tr`
  font-size: 18px;
  border-bottom: 1px solid #fff;
`;

export const TableColumn = styled.td`
  border-bottom: 1px solid black;
  padding: 4px;

  div {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
`;

export const Type = styled.div<{ color: string }>`
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 3px;
  font-weight: bold;
`;

export const Button = styled.button`
  position: absolute;
  top: -2px;
  right: -20px;
  font-size: 20px;
  color: red;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: 0.5s;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background-color: red;
    color: white;
  }
`;
