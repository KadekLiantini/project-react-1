import { useState } from "react";
import PropTypes from "prop-types";

export default function Card({ image, category, title, onClick }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const handleCardClick = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
    onClick(); // Call the onClick function to handle card click in parent component
  };

  const categoryLabels = {
    Makanan: "Kategori Makanan",
    Minuman: "Kategori Minuman",
  };
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-4"
      onClick={handleCardClick}>
      <img
        className="w-[322px] h-[311px] object-cover"
        src={image}
        alt={category}
      />
      <div className="px-6 py-4">
        <div className="text-gray-700 text-base">
          {categoryLabels[category]}
        </div>
        <p className="font-bold text-xl mb-2">{title}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
