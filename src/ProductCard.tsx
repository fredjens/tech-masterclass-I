import React from "react";
import styles from "./ProductCard.module.css";
import {
  registerVevComponent,
  useVevEvent,
  useDispatchVevEvent,
} from "@vev/react";
import ProductCardComponent from "./product";

type Props = {
  title: string;
  productId: string;
  sale?: number;
};

const ProductCard = ({ title = "Vev", productId, sale }: Props) => {
  const [data, setData] = React.useState({});
  const dispatch = useDispatchVevEvent();

  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch("CHANGED_PRODUCT", { productId });
        setData(data);
      });
  }, [productId]);

  useVevEvent("CHANGE_PRODUCT", ({ productId }) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch("CHANGED_PRODUCT", { productId });
        setData(data);
      });
  });

  return (
    <div className={styles.wrapper}>
      <ProductCardComponent {...data} sale={sale} />
    </div>
  );
};

registerVevComponent(ProductCard, {
  name: "ProductCard",
  props: [
    {
      name: "productId",
      type: "select",
      options: {
        display: "autocomplete",
        items: async () => {
          const items = await fetch("https://fakestoreapi.com/products").then(
            (res) => res.json()
          );
          return items.map((item: any) => ({
            value: item.id,
            label: item.title,
          }));
        },
      },
    },
    {
      name: "sale",
      description: "Manually add a sales price",
      type: "number",
    },
  ],
  editableCSS: [
    {
      selector: ".vev-button-color",
      properties: ["background", "color", "font-size", "font-family"],
    },
  ],
  type: "standard",
  interactions: [
    {
      type: "CHANGE_PRODUCT",
      description: "Change the product",
      args: [
        {
          name: "productId",
          type: "select",
          options: {
            display: "autocomplete",
            items: async () => {
              const items = await fetch(
                "https://fakestoreapi.com/products"
              ).then((res) => res.json());
              return items.map((item: any) => ({
                value: item.id,
                label: item.title,
              }));
            },
          },
        },
      ],
    },
  ],
  events: [
    {
      type: "CHANGED_PRODUCT",
      args: [
        {
          name: "productId",
          type: "string",
        },
      ],
    },
  ],
});

export default ProductCard;
