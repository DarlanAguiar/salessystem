import styled from 'styled-components';

export const Container = styled.div`
  transition: 0.3s;
`;

export const AreaLogo = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding-top: 40px;

  img {
    max-width: 60px;
    max-height: 65px;
    border-radius: 10px;
    margin: 0 4px;
    @media (max-width: 600px) {
      max-width: 50px;
      max-height: 55px;
    }
  }

  @media (max-width: 600px) {
    padding-top: 45px;
  }
`;

export const TextLeft = styled.input`
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 33px;
  font-weight: bold;
  width: 310px;
  text-align: right;
  @media (max-width: 600px) {
    font-size: 16px;
    width: 120px;
  }
`;

export const TextRight = styled.input`
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 33px;
  font-weight: bold;
  width: 310px;
  @media (max-width: 600px) {
    font-size: 16px;
    width: 120px;
  }
`;

export const FormArea = styled.div<{ showFieldSendPhoto: boolean }>`
  transition: 0.5s;
  width: 100vw;
  height: 150px;
  z-index: 1;
  background-color: lightblue;
  position: fixed;
  right: 0px;
  bottom: ${(props) => (props.showFieldSendPhoto ? '0px' : '-150px')};
  border-top: 3px solid darkblue;
`;

export const UploadForm = styled.form`
  position: relative;
  padding: 25px 15px 0;
  display: flex;
  flex-direction: column;
  color: darkblue;

  h3 {
    text-align: center;
    color: darkblue;
  }

  .chooseFile {
    background-color: rgb(107, 199, 230);
    margin: 8px;
    padding: 5px;
  }

  .send {
    margin: auto;
    width: 150px;
    padding: 5px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    background-color: blue;
    cursor: pointer;
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  right: 7px;
  top: 7px;
  font-size: 20px;
  border: 0;
  background-color: transparent;
  color: red;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: red;
    color: #fff;
  }
`;

export const Uploading = styled.p`
  color: darkblue;
  text-align: center;
`;
