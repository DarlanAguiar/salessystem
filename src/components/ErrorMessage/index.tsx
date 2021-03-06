import * as C from './styles';
import { useEffect, useState } from 'react';

type Props = {
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

function ErrorMessage (props: Props) {
  const { errorMessage, setErrorMessage } = props;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage !== '') {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 10000);
    }
  }, [errorMessage]);

  return (
    <C.Container showErrorMessage={showError}>
      <C.TitleError>Erro</C.TitleError>
      <C.ErrorMessage>{errorMessage}</C.ErrorMessage>

    </C.Container>

  );
}

export default ErrorMessage;
