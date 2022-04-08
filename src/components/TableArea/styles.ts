import styled from 'styled-components';

export const ContainerTable = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 600px) {
    overflow: auto;
    width: 100vw;
    font-size: 14px;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 35px 20px 20px 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;

  @media (max-width: 600px) {
    width: 100vw;
  }
`;

export const TableHeadColumn = styled.th<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  padding: 0;
  text-align: left;
`;

export const Title = styled.h1`
  font-size: 23px;
  color: darkblue;
  position: absolute;
  top: 7px;
  left: 20px;

  @media (max-width: 600px) {
    font-size: 19px;
    top: 20px;
  }
`;
