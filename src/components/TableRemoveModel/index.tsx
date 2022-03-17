import * as C from "./styles";
import React from "react";
import { ProductDatabase } from "../../types/Product";
import BodyTableRemoveModel from "../BodyTableRemoveModel";

type Props = {
  databaseProduct: ProductDatabase[];
  getProducts: ()=> void;
  handleSetShowRemoveModel: ()=> void;

}

function TableRemoveModel(props: Props) {
  const {databaseProduct, getProducts, handleSetShowRemoveModel} = props;

  console.log(databaseProduct);

  const transaction = databaseProduct.sort((element1, element2) => {
    return element1.name.localeCompare(element2.name);
  });

  return (
    <C.Container>
      <C.ContainerTable>
        <C.Title>Área de remoção Produto/Despesa</C.Title>
        <C.Table>
          <thead>
            <tr className="headerTable">
              <C.TableHeadColumn>Tipo</C.TableHeadColumn>
              <C.TableHeadColumn>Categoria</C.TableHeadColumn>
              <C.TableHeadColumn>Nome</C.TableHeadColumn>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item, index)=> <BodyTableRemoveModel key={index} item={item} getProducts={getProducts}/>)}
           
          </tbody>
        </C.Table>
      </C.ContainerTable>

      <C.ButtonShowRemoveModel onClick={handleSetShowRemoveModel}>Remover Prod/Desp</C.ButtonShowRemoveModel>
    </C.Container>
  );
}

export default TableRemoveModel;
