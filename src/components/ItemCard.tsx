import type { LostFoundItem } from "../types/index";

interface ItemCardProps {
  item: LostFoundItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="item-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Type: <strong>{item.type.toUpperCase()}</strong></p>
      <small>Reported on: {item.createdAt.toLocaleDateString()}</small>
    </div>
  );
}

export default ItemCard;