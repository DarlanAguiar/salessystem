import { useState } from 'react';
import { ProductDatabase } from '../../types/Product';
import * as C from './styles';
import { IoMdClose } from 'react-icons/io';

import { useInfoContext } from '../../contexts/userInfoContext';
import { deleteModelDatabase } from '../../database/firebase';

type Props = {
  item: ProductDatabase;
  getProducts: () => void;
};

function BodyTableRemoveModel (props: Props) {
  const { item, getProducts } = props;

  const { state } = useInfoContext();

  const [showButtonRemove, setShowButtonRemove] = useState(false);

  const removeModelDatabase = async () => {
    const user = state.infoUser?.email;
    const token = await state.infoUser?.getIdToken();
    const authorizedDatabase = state.databaseAuth || user;

    await deleteModelDatabase(item.id, user, token, authorizedDatabase);
    getProducts();
  };

  return (
    <C.ContainerTr
      onMouseEnter={() => setShowButtonRemove(true)}
      onMouseLeave={() => setShowButtonRemove(false)}
    >
      <C.TableColumn>
        <C.Type color={item.expense ? 'red' : 'darkblue'}>
          {item.expense ? 'Despesa' : 'Produto'}
        </C.Type>
      </C.TableColumn>
      <C.TableColumn>{item.category}</C.TableColumn>

      <C.TableColumn>
        <div className="divContainer">
          {item.name}
          {showButtonRemove && (
            <C.Button onClick={removeModelDatabase}>
              <IoMdClose />
            </C.Button>
          )}
        </div>
      </C.TableColumn>
    </C.ContainerTr>
  );
}

export default BodyTableRemoveModel;
