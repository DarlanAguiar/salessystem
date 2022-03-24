import * as C from "./styles";

import React from "react";
import { BestSeller } from "../../types/FilterProducts";

type Props = {
  product: BestSeller;
  money: boolean;
};

function BodySalesSortedlist(props: Props) {
  const { product, money } = props;

  return (
    <C.TableLine>
      <C.TableCulumn>{product.product}</C.TableCulumn>
      <C.TableCulumn color={"rgb(203, 221, 227)"}>
        {money
          ? product.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : product.value}
      </C.TableCulumn>
    </C.TableLine>
  );
}

export default BodySalesSortedlist;
