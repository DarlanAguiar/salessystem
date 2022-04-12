import styled from 'styled-components';

export const Container = styled.div<{showErrorMessage: unknown}>`
  position: fixed;
  z-index: 9;
  right: ${(props) => props.showErrorMessage ? '0' : '-350px'};
  bottom: 25px;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  transition: 0.4s;
  width: 350px;
  border: 1px solid red;
`;

export const TitleError = styled.h2`
  text-align: center;
  color: red;
`;

export const ErrorMessage = styled.p`
  text-align: center;
`;
