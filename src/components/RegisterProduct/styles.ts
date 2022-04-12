import styled from 'styled-components';

export const Container = styled.div<{ showRegisterProduct: boolean, showInvitation: Boolean }>`
  width: 100vw;
  background-color: var(--colorBackground2);
  border-radius: 0 0 30px 5px;
  height: 170px;
  transition: 0.5s;
  position: fixed;
  border: 3px solid
    ${(props) => (props.showRegisterProduct ? 'darkblue' : '#fff')};
  border-top: 0;
  top: ${(props) => (props.showRegisterProduct ? '0' : '-170px')};
  left: 0;
  z-index: ${(props) => (props.showRegisterProduct ? '5' : '1')};
  display: ${(props) => (props.showInvitation ? 'none' : 'block')};
`;

export const ContainerForm = styled.form``;

export const FormField = styled.div`
  padding: 60px 15px 0;
  max-width: 1000px;
  margin: auto;
  display: flex;

  @media (max-width: 600px) {
    overflow: scroll;
    flex-direction: column;
    padding: 10px 10px;
  }
`;

export const DivInputTop = styled.div`
  display: flex;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

export const DivInputDown = styled.div`
  display: flex;
`;

export const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;

export const InputDiv = styled.div`
  margin: 0 10px;
  width: 100%;

  .radioButtons {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;

    label {
      font-size: 18px;
      font-weight: bold;
      @media (max-width: 600px){
    font-size: 15px;
  }

    }
  }
`;

export const InputLabel = styled.label`
  font-size: 19px;
  font-weight: bold;
  @media (max-width: 600px){
    font-size: 15px;
  }
`;

export const InputText = styled.input`
  width: 100%;
  border: 1px solid darkblue;
  border-radius: 5px;
  font-weight: bold;
  padding: 7px;
`;

export const DivButtons = styled.div`
display: flex;
flex-direction: column;
`;

export const ButtonRegisterCancel = styled.button`
  display: block;
  margin-bottom: 5px;
  background-color: red;
  color: var(--colorFontSecondary);
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  @media (max-width: 600px){
    font-size: 15px;
  }
`;

export const ButtonSubmit = styled.input`
  background-color: var(--colorBackground);
  color: var(--colorFontSecondary);
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  @media (max-width: 600px){
    font-size: 15px;
  }
`;

export const CloseRegisterProductButton = styled.button<{
  showRegisterProduct: boolean;
}>`
  width: 110px;
  height: 35px;
  padding: 5px;
  border: 3px solid
    ${(props) => (props.showRegisterProduct ? 'darkblue' : '#fff')};
  border-top: 0;
  background-color: ${(props) =>
    props.showRegisterProduct ? 'lightblue' : 'darkblue'};
  color: ${(props) => (props.showRegisterProduct ? '#000' : '#fff')};
  font-size: 15px;
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  left: 8px;
  bottom: -35px;

  &:hover {
    background-color: lightblue;
    color: black;
  }

  @media (max-width: 600px) {
    width: 25vw;
    left: 0;
    font-size: 11px;
  }
`;
