import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });
  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    
    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    // em Caso de formatação de dados ou calculos que podem ser feitos no momento
    // EM que se busca a informação, é preferível que isso se faça assim que esse dados
    // são buscados, pois assim evita a utilização de useMemos desnecessários.

    setResults({ totalPrice, data: products });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        onAddToWishList={addToWishList}
        results={results.data}
        totalPrice={results.totalPrice}
      />
    </div>
  );
}

/**
 * Sempre que um componente pai renderiza ou o componente tem seu estado atualizado
 * O react utiliza do método de Reconciliação para atualizar a arvore de componentes
 * Sempre que isso ocorre ele segue a seguinte sequencia:
 * 1. Criar uma nova versão do componente
 * 2. Ele vai comparar com a versão anterior
 * 3. Se houver alterações, vai atualizar o que foi alterado
 *
 * O que leva um componente a uma nova renderização:
 * 1. Componente pai atualizou/renderizou novamente, todos os filhos tbm tem uma nova renderização.
 * 2. Houve alguma atualização ex.: Hooks no componente.
 * 3. Houve alguma mudança em alguma propriedade do componente.
 */

/**
 * EXPLICAÇÃO DO BUNDLE
 * 
 * Quando vamos gerar uma versão para produção, rodamos o yarn build, por ex
 * Nesse caso, ele gera um bundle.js, no qual fica todo o frontend em javascript
 * compilado ali dentro. 
 * 
 */
