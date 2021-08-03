interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishListProps) {
  return (
    <span>
      Deseja adicionar a lsita de favoritos?
      <button type="button" onClick={onAddToWishList}>
        SIM
      </button>
      <button type="button" onClick={onRequestClose}>
        NÃO
      </button>
    </span>
  );
}
