import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  padding: 27px 20px 20px 20px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 600px) {
    overflow: auto;
    background-color: rgba(173, 216, 230, 0.386);
  }

  @media (max-width: 600px) {
  }
`;

export const Title = styled.div`
  position: absolute;
  top: 7px;
  font-size: 23px;
  color: darkblue;
  font-weight: bold;
`;

export const AddMoreOne = styled.button`
  position: absolute;
  top: 7px;
  right: 60px;
  font-size: 20px;
  color: darkblue;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: 0.5s;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background-color: lightblue;
  }
`;

export const Closed = styled.button`
  position: absolute;
  top: 7px;
  right: 20px;
  font-size: 20px;
  color: red;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: 0.5s;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background-color: red;
    color: white;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;

  @media (max-width:600px){
    flex-direction: column;
  }
`;

export const AreaUp = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;

  .date {
    width: 20%;
    @media (max-width: 600px) {
      width: 20%;
    }
  }

  .category {
    width: 30%;
    @media (max-width: 600px) {
      width: 35%;
    }
  }
  .product {
    width: 50%;
    @media (max-width: 600px) {
      width: 45%;
    }
  }

  @media (max-width:600px){
    width: 100vw;
  }
`;

export const AreaDown = styled.div`
  width: 40%;
  display: flex;

  .qtd {
    width: 25%;
  }
  .value {
    width: 35%;
  }
  .button {
    width: 44%;
  }
  @media (max-width:600px){
    width: 100vw;
    margin-top: -10px;
  }
`;

export const InputLabel = styled.label`
  margin: 10px;
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
  background-color: lightblue;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: blue;
    color: white;
  }
`;
