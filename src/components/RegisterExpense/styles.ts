import styled from "styled-components";

export const Container = styled.div<{ showRegisterExpense: boolean }>`
  width: 100vw;
  background-color: var(--colorBackground2);
  border-radius: 0 0 30px 30px;
  height: 170px;
  transition: 0.5s;
  position: fixed;
  top: ${(props) => (props.showRegisterExpense ? "0" : "-170px")};
  left: 0;
  z-index: ${(props) => (props.showRegisterExpense ? "5" : "1")};
  border: 3px solid
    ${(props) => (props.showRegisterExpense ? "darkblue" : "#fff")};
  border-top: 0;
`;

export const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;

export const ContainerForm = styled.form``;

export const FormField = styled.div`
  padding: 60px 15px 0;
  max-width: 1000px;
  margin: auto;
  display: flex;

  @media(max-width: 600px) {
    overflow: scroll;
   
  }
`;

export const InputDiv = styled.div<{ width?: number }>`
  margin: 0 10px;
  width: 180px;

  .radioButtons {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;

    label {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 19px;
  font-weight: bold;
`;

export const InputText = styled.input`
  width: 100%;
  border: 1px solid darkblue;
  border-radius: 5px;
  font-weight: bold;
  padding: 7px;
`;

export const DivButtons = styled.div``;

export const ButtonSubmit = styled.input`
  background-color: var(--colorBackground);
  color: var(--colorFontSecondary);
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
`;

export const ButtonExpenseCancel = styled.button`
  display: block;
  margin: auto;
  margin-top: 15px;
  background-color: red;
  color: var(--colorFontSecondary);
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
`;

export const CloseExpenseButton = styled.button<{
  showRegisterExpense: boolean;
}>`
  width: 110px;
  height: 35px;
  padding: 5px;
  border: 3px solid
    ${(props) => (props.showRegisterExpense ? "darkblue" : "#fff")};
  border-top: 0;
  background-color: ${(props) =>
    props.showRegisterExpense ? "lightblue" : "darkblue"};
  color: ${(props) => (props.showRegisterExpense ? "#000" : "#fff")};
  font-size: 15px;
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  left: 124px;
  bottom: -35px;

  &:hover {
    background-color: lightblue;
    color: black;
  }

  @media (max-width: 600px) {
    width: 25vw;
    left: 25vw;
    font-size: 11px
  }
`;


