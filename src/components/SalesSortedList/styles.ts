import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  margin: auto;

  @media (max-width: 600px) {
    width: 100vw;
    font-size: 15px;
  }
`;

export const DivFilterByDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin: 5px auto;
`;
export const LabelInitialDate = styled.label`
  margin-right: 10px;

  input {
    width: 150px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
  }
`;

export const LabelFinalDate = styled.label`
  input {
    width: 150px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
  }
`;

export const ButtonFilter = styled.button`
  font-weight: bold;
  width: 100px;
  padding: 5px 10px;
  margin-left: 7px;
  background-color: lightblue;
  border-radius: 5px;
  border: 1px solid lightblue;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: darkblue;
  }
`;

export const ContainerTables = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
`;

export const DivTable = styled.div``;

export const TitleTable = styled.h2`
  text-align: center;
`;

export const Table = styled.table`
  background-color: lightblue;
  padding: 15px;
  border-radius: 10px;
`;

export const TableRow = styled.tr`
  background-color: darkblue;
  color: #fff;
`;

export const TableHeadColumn = styled.th`
  text-align: left;
  padding: 5px;
`;

export const Tbody = styled.tbody``;
