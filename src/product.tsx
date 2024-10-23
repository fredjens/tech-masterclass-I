import React from "react";

interface ProductCardProps {
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  sale?: number;
  badge?: string;
  badgeColor?: "default" | "secondary" | "destructive" | "outline";
}

export default function ProductCard({
  image = "https://placehold.co/600x400",
  title = "Product Title",
  description = "Product description goes here. This is a default description.",
  price,
  sale,
  badge,
  badgeColor = "default",
}: ProductCardProps) {
  const discountPercentage =
    sale && price ? Math.round((1 - sale / price) * 100) : 0;

  const badgeColorClasses = {
    default: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    destructive: "bg-red-500 text-white",
    outline: "bg-white text-gray-900 border border-gray-300",
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        {(badge || sale) && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded ${badgeColorClasses[badgeColor]}`}
          >
            {badge || (sale ? "Sale" : "")}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline gap-2 text-black">
          {sale !== undefined ? (
            <>
              <p className="text-xl font-bold text-red-600">${sale}</p>
              {price !== undefined && (
                <p className="text-sm line-through text-gray-500">${price}</p>
              )}
              {discountPercentage > 0 && (
                <span className="ml-auto text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                  {discountPercentage}% off
                </span>
              )}
            </>
          ) : price !== undefined ? (
            <p className="text-xl font-bold">${price}</p>
          ) : (
            <p className="text-xl font-bold">Price not available</p>
          )}
        </div>
      </div>
      <div className="p-4 pt-0">
        <button className="w-full bg-blue-500 vev-button-color text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
          Buy Now
        </button>
      </div>
    </div>
  );
}
