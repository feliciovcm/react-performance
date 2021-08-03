import { ProductItem } from "./ProductItem";

import { List, ListRowRenderer } from "react-virtualized";

/** 
 * O que o react-virtualizer faz? Conceito de virtualização
 * 
 * No caso, quando há muitos dados sendo exibidos em tela, sendo, um lista muito
 * grande ou uma table acom muitos dados. Podemos usar o conceito de virtualização
 * utilizando a lib react-virtualizer.
 * 
 * Nesse caso, o List de dentro da biblioteca irá renderizar uma quantidade de items,
 * e só irá renderizar o restante a medida que movemos o scroll.
 * Não irá carregar tudo de uma vez só, diminuindo assim o tempo inicial de renderização.
 */

/**
 * Utilizar o bundle analyzer para verificar as libs que mais causam impacto no app;
 */

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          onAddToWishList={onAddToWishList}
          product={results[index]}
        />
      </div>
    );
  };

  // Mesmo utilizando o useMemo, há um custo de processamento, pois
  // O react tem que verificar se esse RESULTS (nesse caso) não mudou.

  // A estrutura do useMemo é semelhante a do useEffect. Ele recebe um array de
  // dependencias como segundo parâmetro. Mas o que ele realmente faz?
  // Nesse caso, ele só irá recalcular o nosso totalPrice CASO a variável
  // contida dentro do array de dependecias mudar. Ou seja, nessa situação,
  // ele irá recalcular toda vez que o nosso results mudar, caso não mudar, quando esse
  // componente for re-renderizado, se o results for o mesmo, ele não irá recalcular o totalPrice.

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

/**
 * useMemo / useCallback
 *
 * useMemo => Utilizado para situações onde há calculos que exigem processamento.
 * Nesses casos, podemos utilizar o useMemo, para executar esses calculos somente quando
 * realmente houver mudanças nas variaveis que compoem o calculo. Evitandoa ssim, que quando as mesmas
 * Não mudarem, esse calculo não seja refeito em toda re-rederização do componente.
 * Resumo: 2 situações de uso
 * 1. Calculos pesados, e somente pesados.
 * 2. Igualdade referencial (quando a gente passa aquela informação apra um componente filho).
 *
 * useCallback => Utilizado para manter funções. Principalmente quando a prop drilling.
 * 1. Evitar que a função seja recriada do zero quando há prop drilling ou em contextos que são
 * utilizados em varios lugares. Pq? Evitando isso, a função não vai ocupar um novo lugar na memoria
 * evitando que o componente seja re renderizado sem necessidade.
 *
 * O useCallback aceita a função no primeiro parametro e um array de dependecias no segundo
 * no qual será os valores/estados que talvez sejam necessarios dentro da função.
 * Ou seja, somente para o caso de IGUALDADE REFERENCIAL.
 */
