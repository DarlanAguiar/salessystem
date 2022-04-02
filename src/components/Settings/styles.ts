import styled from 'styled-components';

export const Container = styled.div<{ showSettings: boolean }>`
  background-color: #ccc;
  width: 450px;
  height: calc(100vh - 35px);
  position: fixed;
  top: 35px;
  left: ${(props) => (props.showSettings ? '0' : '-450px')};
  border: 3px solid blue;
  border-radius: 0 10px 10px 0;
  padding: 15px;
  overflow: auto;
  transition: 0.5s;

  @media (max-width: 600px) {
    width: 80vw;
    left: ${(props) => (props.showSettings ? '0' : '-80vw')};
  }
`;

export const ButtonCloseSettings = styled.button`
  position: absolute;
  top: 7px;
  right: 10px;
  background-color: transparent;
  border: 0;
  font-size: 20px;
  color: darkblue;
  transition: 0.3s;
  display: flex;
  padding: 3px;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background-color: red;
  }
`;

export const Title = styled.h2`
  margin: 10px;
  color: darkblue;
`;

export const ContainerFilds = styled.div``;

export const DivInput = styled.div`
  margin-bottom: 10px;
`;

export const TitleUser = styled.h3`
  color: darkblue;
  margin: 5px;
`;

export const Label = styled.label`
  display: block;
`;

export const Input = styled.input`
  border: 1px solid lightblue;
  padding: 7px;
  border-radius: 5px;
`;

export const StatusAuthorization = styled.p`
  color: darkblue;
  span {
    font-weight: bold;
  }
`;

export const ButtonAccessMyDatabase = styled.button`
  padding: 5px;
  border-radius: 5px;
  background-color: lightblue;
  margin-bottom: 10px;
`;

export const DivInputAuth = styled.div``;

export const DivUsersAuth = styled.div``;

export const DivUser = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const User = styled.p``;

export const AllowedUsers = styled.h4`
  color: darkblue;
  margin-top: 10px;
`;

export const ButtonRemoveUser = styled.button`
  border: 0;
  background-color: transparent;
  padding: 4px;
  border-radius: 4px;
  display: fles;

  &:hover {
    color: #fff;
    background-color: red;
  }
`;

export const ButtonConfirm = styled.button`
  border: 1px solid lightblue;
  background-color: lightblue;
  margin-left: 8px;
  padding: 7px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;

  &:hover {
    color: #fff;
    background-color: darkblue;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 5px;
  }
`;
