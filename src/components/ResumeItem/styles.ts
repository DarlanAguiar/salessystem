import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin-top: 3px;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  color: #888;
  margin-bottom: 5px;
`;

export const Value = styled.div<{ color?: string }>`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color ?? '#000'};
  padding: 0 10px;
`;
