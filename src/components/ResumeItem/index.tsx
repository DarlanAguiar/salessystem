import * as C from './styles';

type Props = {
  title: string;
  value: number;
  color?: string;
};

function ResumeItem (props: Props) {
  const { title, value, color } = props;

  return (
    <C.Container>
      <C.Title>{title}</C.Title>
      <C.Value color={color}>
        {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </C.Value>
    </C.Container>
  );
}

export default ResumeItem;
