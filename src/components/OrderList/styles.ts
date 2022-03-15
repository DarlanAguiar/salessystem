import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  background-color: var(--colorBackground3);
  border-radius: 10px;
  transition: 0.3s;

  .tableSummary {
  }
`;

export const TableSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MoneyChange = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;

  input {
    font-weight: bold;
    width: 80px;
    padding: 7px;
    border-radius: 5px;
  }

  label {
    margin-right: 3px;
  }

  p {
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;

    .leftover {
      color: green;
      font-size: 29px;
    }
    .lack {
      color: red;
      font-size: 29px;
    }
  }
`;

export const CloseSale = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  transition: 0.3s;

  p {
    font-size: 20px;
    margin: 0 10px;
  }

  span {
    color: darkblue;
    margin: 0 10px;
    font-size: 29px;
  }

  .completeSaleButton {
    display: block;
    font-weight: bold;
    width: 150px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid barkblue;
    border-radius: 5px;
    background-color: lightblue;
    color: black;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: green;
      color: white;
    }
  }

  .cancelSale {
    display: block;
    font-weight: bold;
    height: 30px;
    margin-right: 5px;
    padding: 0 5px;
    border: 1px solid red;
    border-radius: 5px;
    background-color: tomato;
    color: black;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

export const ContainerTable = styled.table`
  width: 100%;
`;

export const TableHeadColumn = styled.th`
  padding: 10px 0;
  text-align: left;
`;
