import styled from 'styled-components';

export const container = styled.div<{showInvitation: boolean}>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: blue;
  display: ${(props) => props.showInvitation ? 'block' : 'none'};
`;
/* rgba(173, 216, 230, 0.698); */
export const CardModal = styled.div`
  width: 70vw;
  margin: 100px auto;
  background-color: lightblue;
  border: 3px solid darkblue;
  padding: 16px 10px;
  border-radius: 15px;
  text-align: center;
  position: relative;
`;

export const Loading = styled.div`
position: absolute;
top: 0;
left: 0;
border-radius: 10px;
background-color: lightblue;
width: 100%;
height: 100%;
font-size: 25px;
z-index: 1;
display: flex;
justify-content: center;
align-items: center;

`;

export const ButtonClose = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 20px;
  cursor: pointer;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis; 
  span {
    color: darkblue;
  }
  @media (max-width: 600px){
    font-size: 16px;
  }
`;

export const DivButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ButtonAccept = styled.button`
  padding: 8px;
  color: white;
  background-color: darkblue;
  border-radius: 7px;
  cursor: pointer;
  margin: 0 5px 10px 5px;
  overflow: hidden;
  text-overflow: ellipsis; 
  span {
    font-weight: bold;
  }
  @media (max-width: 600px){
    width: 100%;
    padding: 5px; 
  }
`;

export const ButtonDeny = styled.button`
  padding: 8px;
  color: white;
  background-color: darkblue;
  border-radius: 7px;
  cursor: pointer;
  margin: 0 5px 10px 5px;
  @media (max-width: 600px){width: 100%}
`;

export const HelpInformation = styled.p`
  span {
    font-weight: bold;
    color: darkblue;
  }
`;
