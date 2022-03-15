import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  background-color: darkblue;
  height: 150px;
  color: white;
  text-align: center;

  .bottonLogout {
  }
`;

export const ButtonLogout = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 5px;
  border: 3px solid var(--colorFontSecondary);
  background-color: transparent;
  color: var(--colorFontSecondary);
  font-size: 17px;
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
`;

export const HeaderText = styled.h1`
  margin: 0;
  padding: 0;
  color: var(--colorFontPrimary);
  padding-top: 30px;
`;

export const Body = styled.div`
  margin: auto;
  max-width: 1000px;
  margin-bottom: 60px;
`;
