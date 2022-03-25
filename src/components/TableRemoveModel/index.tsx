import * as C from "./styles";
import React from "react";
import { ProductDatabase } from "../../types/Product";
import BodyTableRemoveModel from "../BodyTableRemoveModel";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  databaseProduct: ProductDatabase[];
  getProducts: () => void;
  handleSetShowRemoveModel: () => void;
  showRemoveModel: boolean;
};

function TableRemoveModel(props: Props) {
  const {
    databaseProduct,
    getProducts,
    handleSetShowRemoveModel,
    showRemoveModel,
  } = props;

  const transaction = databaseProduct.sort((element1, element2) => {
    return element1.name.localeCompare(element2.name);
  });

  return (
    <C.Container showRemoveModel={showRemoveModel}>
      <div>
        <C.ContainerTable>
          <div className="areaTable">
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
                {transaction.map((item, index) => (
                  <BodyTableRemoveModel
                    key={index}
                    item={item}
                    getProducts={getProducts}
                  />
                ))}
              </tbody>
            </C.Table>
          </div>
          <C.ButtonShowRemoveModel
            showRemoveModel={showRemoveModel}
            onClick={handleSetShowRemoveModel}
          >
            <FaRegTrashAlt />
            Prod/Desp
          </C.ButtonShowRemoveModel>
        </C.ContainerTable>
      </div>
    </C.Container>
  );
}

export default TableRemoveModel;
