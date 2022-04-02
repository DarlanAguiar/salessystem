import styled from 'styled-components';

export const Container = styled.div<{ showExpenseField: boolean }>`
  transition: 0.5s;
  width: 100vw;
  background-color: lightblue;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 0 0 40px 40px;
  border: 3px solid darkblue;
  border-top: 0;
  height: 170px;
  position: fixed;
  top: ${(props) => (props.showExpenseField ? '0' : '-170')}px;
  z-index: ${(props) => (props.showExpenseField ? '5' : '1')};
  
  @media (max-width: 600px) {
    border-radius: 0 0 0 40px;
    
  }
  
  div {
    width: 100%;
    height: 100%;
    position: relative;
    
  }

  .addExpenseButton {
    width: 160px;
    height: 35px;
    padding: 5px;
    border: 3px solid
      ${(props) => (props.showExpenseField ? 'darkblue' : '#fff')};
    border-top: 0;
    background-color: ${(props) =>
      props.showExpenseField ? 'lightblue' : 'darkblue'};
    color: ${(props) => (props.showExpenseField ? '#000' : '#fff')};
    font-size: 15px;
    border-radius: 0 0 10px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    position: absolute;
    left: 355px;
    bottom: -35px;

    &:hover {
      background-color: lightblue;
      color: black;
    }

    @media (max-width: 600px) {
      width: 24.5vw;
      left: 75vw;
      font-size: 13px;
      height: 37px;
      bottom: -37px;
    }
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: auto;

  .date {
    width: 150px;
  }

  .category {
    width: 150px;
  }
  .product {
    width: 150px;
  }

  .value {
    width: 150px;
  }
  .button {
    width: 150px;
  }

  @media(max-width: 600px) {
    overflow: scroll;
   
  }
`;

export const InputLabel = styled.label`
  margin: 10px;

  .buttonRegister {
    background-color: darkblue;
    font-weight: bold;
    color: white;
    cursor: pointer;
    margin-bottom: 5px;
   

    @media(max-width: 600px) {

      padding: 5px 10px 35px;
 
   
  }

  }

  .buttonCancel {
    background-color: tomato;
    font-weight: bold;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: red;
      color: white;
    }
  }
`;
export const InputTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;
export const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;
export const Button = styled.button`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;
