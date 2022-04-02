import styled from 'styled-components';

export const Container = styled.div<{ showRemoveModel: boolean }>`
  width: 100%;
  background-color: lightblue;
  height: 350px;
  transition: 0.5s;
  position: fixed;
  top: ${(props) => (props.showRemoveModel ? '0' : '-350px')};
  left: 0;
  z-index: ${(props) => (props.showRemoveModel ? '5' : '1')};
  border: 3px solid ${(props) => (props.showRemoveModel ? 'darkblue' : '#fff')};
  border-top: 0;

  @media (max-width: 600px) {
    width: 100vw;
  }

  div {
    height: 100%;
    width: 100%;
    position: relative;
  }
`;

export const ContainerTable = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;

  .areaTable {
    height: 300px;
    width: fit-content;
    padding: 25px;
    border-radius: 10px;
    overflow: auto;
    background: rgb(208, 223, 228);
    margin: auto;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: darkblue;
  font-size: 23px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Table = styled.table`
  width: fit-content;
  margin: 15px auto;

  .headerTable {
    background-color: darkblue;
    border: 0;
    font-size: 20px;

    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
`;

export const TableHeadColumn = styled.th`
  padding: 5px 20px;
  color: white;
`;

export const ButtonShowRemoveModel = styled.button<{
  showRemoveModel: boolean;
}>`
  width: 110px;
  height: 35px;
  padding: 5px;
  border: 3px solid ${(props) => (props.showRemoveModel ? 'darkblue' : '#fff')};
  border-top: 0;
  background-color: ${(props) =>
    props.showRemoveModel ? 'lightblue' : 'darkblue'};
  color: ${(props) => (props.showRemoveModel ? '#000' : '#fff')};
  font-size: 15px;
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  left: 240px;
  bottom: -35px;

  @media (max-width: 600px) {
    font-size: 11px;
    width: 90px;
  }

  &:hover {
    background-color: lightblue;
    color: black;
  }

  @media (max-width: 600px) {
    width: 25vw;
    left: 50vw;
    font-size: 11px;
  }
`;
