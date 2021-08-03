import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
//No caso de uma aplicação react, importamos o lazy de dentro do react;

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Carregando ...</span>,
  }
);

// Se estivessemos utilizando o export default dentro do addProductToWishList, poderiamos finalizar
// o import no import('./AddProductToWishList'))
// utilizando essa maneira de importação, o código do componente só será buscado
// quando esse componente for renderizado em tela.

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product); //Object.is faz uma comparação profunda. Compara prop a prop dos objetos sendo comaprados. Gasta processamento.
  }
);

// O que o memo faz?
// Shallow compare -> Comparadação rasa.
// ELe compara se as propriedades que o componente está recebendo são iguais as anteriores.
// No caso de objetos ou array, temos que adicionar um segundo parâmetro. Pq?
// No js {} === {} = false, poís os js faz uma IGUALDADE REFERENCIAL.

/**
 * Em quais situações usaremos o memo??
 *
 * 1. Pure functional components.
 * 2. Renders too often componentes
 * 3. Re-renders with same props
 * 4. Medium to large components.
 */

/**
 * Quando temos componentes que nem sempre estão sendo exibidos em tela, por ex
 * componentes que dependem de alguma condição para serem renderizados, podemos utilizar
 * a funcionalidade de lazy loading.
 */
