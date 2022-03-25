import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  background-color: var(--colorBackground);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  transition: all ease 0.8s;
  box-shadow: 0px 0px 10px black;
`;

export const HeaderText = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    color: var(--colorFontPrimary);
  }
  p {
    color: var(--colorFontSecondary);
  }
`;

export const Form = styled.div`
  .buttonGoogle {
    width: 100%;
    padding: 5px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    background-color: rgb(0, 153, 255);
    color: white;
  }

  .createNewAccount {
    width: 100%;
    padding: 5px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    background-color: var(--colorBackground2);
    color: black;
  }

  p {
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
    color: var(--colorFontSecondary);
  }
`;

export const FormInput = styled.div`
  color: var(--colorFontSecondary);

  p {
    font-size: 14px;
    margin: -5px 5px 5px 5px;
  }

  label {
    display: block;
    margin: 3px;
  }

  input {
    width: 100%;
    padding: 8px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  button {
    width: 45%;
    padding: 5px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    background-color: var(--colorFontPrimary);
  }
`;
