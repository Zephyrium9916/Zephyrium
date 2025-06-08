import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  icon: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition w-full">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default ProductCard;
