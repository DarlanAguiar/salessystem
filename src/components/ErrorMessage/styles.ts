import styled from 'styled-components';

export const Container = styled.div<{showErrorMessage: unknown}>`
  position: fixed;
  z-index: 9;
  right: ${(props) => props.showErrorMessage ? '0' : '-353px'};
  bottom: 25px;
  margin: 0 3px 0 0 ;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  transition: 0.4s;
  width: 350px;
  border: 1px solid red;
  font-size: 24px;
  @media (max-width: 600px){
    font-size: 16px;
  }
`;

export const TitleError = styled.h2`
  text-align: center;
  color: red;
`;

export const ErrorMessage = styled.p`
  text-align: center;
`;
