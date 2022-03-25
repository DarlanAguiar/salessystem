import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  background-color: darkblue;
  height: 150px;
  color: white;
  display: flex;
  justify-content: center;

  .bottonLogout {
  }
`;

export const ButtonLogout = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 5px;
  border: 0;
  background-color: transparent;
  color: var(--colorFontSecondary);
  font-size: 35px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: lightblue;
    color: black;
  }

  @media (max-width: 600px) {
    top: 70px;
    right: 2px;
    padding: 3px;
    font-size: 27px;
   
  }
`;

export const ButtonSettings = styled.button`

position: absolute;
  top: 8px;
  right: 60px;
  padding: 5px;
  border: 0;
  background-color: transparent;
  color: var(--colorFontSecondary);
  font-size: 35px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: lightblue;
    color: black;
  }

  @media (max-width: 600px) {
    font-size: 27px;
    top: 70px;
    right: 40px;
    padding: 3px;
   
   
  }

`

export const HeaderText = styled.h1`
  margin: 0;
  padding: 0;
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;

  img{
    width: 60px;
    border-radius: 50%;
    margin: 0 4px;
  }

  
`;

export const Body = styled.div`
  margin: auto;
  max-width: 1000px;
  margin-bottom: 60px;
`;
