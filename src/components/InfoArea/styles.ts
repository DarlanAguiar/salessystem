import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
  padding: 35px 20px 20px 20px;
  margin-top: -40px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  position: absolute;
  top: 7px;
  font-size: 23px;
  color: darkblue;
  font-weight: bold;
`;

export const DayArea = styled.div`
  input {
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
  }
`;

export const MonthArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const MonthArrow = styled.div`
  width: 40px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
`;

export const MonthTitle = styled.div`
  flex: 1;
  text-align: center;
`;

export const ResumeArea = styled.div`
  flex: 2;
  display: flex;
`;
