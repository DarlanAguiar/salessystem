import { ItemDataBase } from '../../types/Item';
import TableItem from '../TableItem';
import * as C from './styles';

type Props = {
  filteredList: ItemDataBase[];
  titleTable: string;
  getList: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

function TableArea (props: Props) {
  const { filteredList, titleTable, getList, setErrorMessage } = props;

  return (
    <C.ContainerTable>
      <C.Title>Registros de {titleTable} </C.Title>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeadColumn>Data</C.TableHeadColumn>
            <C.TableHeadColumn>Categoria</C.TableHeadColumn>
            <C.TableHeadColumn>Produto</C.TableHeadColumn>
            <C.TableHeadColumn>Qtd</C.TableHeadColumn>
            <C.TableHeadColumn>Preço</C.TableHeadColumn>
          </tr>
        </thead>

        <tbody>
          {filteredList.map((item, index) => (
            <TableItem key={index} item={item} getList={getList} setErrorMessage={setErrorMessage} />
          ))}
        </tbody>
      </C.Table>
    </C.ContainerTable>
  );
}

export default TableArea;
