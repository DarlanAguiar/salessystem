import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: auto;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

export const DivFilterByDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin: 10px auto;
`;
export const LabelInitialDate = styled.label`
  margin-right: 10px;

  input {
    width: 150px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    width: 35%;
  }
`;

export const LabelFinalDate = styled.label`
  input {
    width: 150px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    width: 35%;
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

  @media (max-width: 600px){
    width: 30%;
    padding: 5px;
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
  @media (max-Width: 600px){
    font-size: 18px;
  }
`;

export const Table = styled.table`
  background-color: lightblue;
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 600px){
    font-size: 12px;
    padding: 5px;
  }
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
