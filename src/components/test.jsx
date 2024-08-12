import { useState, useEffect, useMemo } from "react";
import Card from "./card";
import styles from "./customScrollbar.module.css";
import Modal from "./modal";
import clsx from "clsx";
import recipes from "../data/recipes/index";
import titleImg from "../assets/img/title.svg";

export default function TabTest() {
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kategoriLabels = {
    semua: "Semua",
    Makanan: "Kategori Makanan",
    Minuman: "Kategori Minuman",
  };

  const filteredCards = useMemo(() => {
    return selectedKategori === "semua"
      ? recipes
      : recipes.filter((card) => card.kategori === selectedKategori);
  }, [selectedKategori]);

  useEffect(() => {
    const savedCardId = localStorage.getItem("selectedCardId");
    if (savedCardId) {
      const savedCard = recipes.find((card) => card.id === savedCardId);
      if (savedCard) {
        setSelectedCard(savedCard);
      } else {
        localStorage.removeItem("selectedCardId");
      }
    }
  }, []);

  useEffect(() => {
    if (filteredCards.length > 0 && !selectedCard) {
      setSelectedCard(filteredCards[0]);
    }
  }, [filteredCards, selectedCard]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    localStorage.setItem("selectedCardId", card.id);
    if (window.innerWidth <= 640) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className={`${styles.scrollContainer} overflow-hidden`}>
      <div className="text-center pb-8">
        <div className="flex justify-center">
          <img src={titleImg} alt="Title" />
        </div>
        <h1
          className={clsx(
            "md: text-[40px] font-semibold",
            "mobile: text-[20px]"
          )}>
          POPULAR RECIPES
        </h1>
      </div>
      <div
        className={clsx(
          styles.scrollContainer,
          "p-2 gap-8",
          "md:flex",
          "max-w-[1440p] justify-center"
        )}>
        <div>
          <div
            className={clsx(
              "flex mb-4 justify-center gap-4 border-t-[1px] border-b-[1px] py-4"
            )}>
            <button
              onClick={() => setSelectedKategori("semua")}
              className={`px-4 py-2 rounded ${
                selectedKategori === "semua"
                  ? "bg-[#403D3D] text-white"
                  : "bg-white border text-black"
              }`}>
              Semua
            </button>
            <button
              onClick={() => setSelectedKategori("Makanan")}
              className={`px-4 py-2 rounded ${
                selectedKategori === "Makanan"
                  ? "bg-[#403D3D] text-white"
                  : "bg-white border text-black"
              }`}>
              Makanan
            </button>
            <button
              onClick={() => setSelectedKategori("Minuman")}
              className={`px-4 py-2 rounded ${
                selectedKategori === "Minuman"
                  ? "bg-[#403D3D] text-white"
                  : "bg-white border text-black"
              }`}>
              Minuman
            </button>
          </div>

          <div
            className={clsx(
              styles.scrollContainer,
              "grid cursor-pointer overflow-y-scroll h-screen",
              "lg:h-[80vh] lg:w-[60vw]",
              "md:w-[50vw] md:h-[100vh] mobile:h-[100vh]"
            )}>
            <div
              className={clsx(
                "h-fit grid grid-cols-1 place-items-center",
                "lg:grid-cols-2",
                "2xl:grid-cols-3"
              )}>
              {filteredCards.map((card, index) => (
                <Card
                  key={index}
                  image={card.gambar}
                  category={card.kategori}
                  title={card.nama}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedCard && (
          <div
            className={clsx(
              styles.scrollContainer,
              "hidden overflow-y-scroll border scrollbar-thin scrollbar-webkit",
              "md:block md:h-[100vh] lg:h-[96vh]"
            )}>
            <div className="p-8 float-right ">
              <h2 className="text-2xl font-bold mb-2 uppercase">
                {selectedCard.nama}
              </h2>
              <p className="text-black text-base mb-8">
                {kategoriLabels[selectedCard.kategori]}
              </p>

              <img
                className="w-full h-[350px] object-cover mb-4"
                src={selectedCard.gambar}
                alt={selectedCard.kategori}
              />

              <h3 className="text-base font-semibold">Bahan:</h3>
              {selectedCard.bahan ? (
                <ul className="list-disc list-inside text-black text-sm">
                  {selectedCard.bahan.map((bahan, index) => (
                    <li key={index}>{`${bahan.total} ${bahan.nama_bahan}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients available</p>
              )}
              <h3 className="text-base font-semibold mt-8">
                Peralatan yang dibutuhkan:
              </h3>
              {selectedCard.peralatan ? (
                <ul className="list-disc list-inside text-black text-sm">
                  {selectedCard.peralatan.map((alat, index) => (
                    <li key={index}>{alat}</li>
                  ))}
                </ul>
              ) : (
                <p>No equipment available</p>
              )}
              <h3 className="text-base font-semibold mt-12">
                Langkah Membuat:
              </h3>
              {selectedCard.langkah ? (
                <ol className="list-decimal list-inside text-black text-sm">
                  {selectedCard.langkah.map((langkah, index) => (
                    <li key={index}>{langkah}</li>
                  ))}
                </ol>
              ) : (
                <p>No steps available</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCard && (
          <div
            className={clsx(
              styles.scrollContainer,
              "overflow-y-scroll h-[70vh] scrollbar-thin scrollbar-webkit"
            )}>
            <h2 className="text-2xl font-bold mb-2 uppercase">
              {selectedCard.nama}
            </h2>
            <p className="text-black text-base mb-8">
              {kategoriLabels[selectedCard.kategori]}
            </p>
            <img
              className="w-full h-[350px] object-cover mb-4"
              src={selectedCard.gambar}
              alt={selectedCard.kategori}
            />
            <h3 className="text-base font-semibold">Bahan:</h3>
            <ul className="list-disc list-inside text-black text-sm">
              {selectedCard.bahan.map((bahan, index) => (
                <li key={index}>{`${bahan.total} ${bahan.nama_bahan}`}</li>
              ))}
            </ul>
            <h3 className="text-base font-semibold mt-8">
              Peralatan yang dibutuhkan:
            </h3>
            <ul className="list-disc list-inside text-black text-sm">
              {selectedCard.peralatan.map((alat, index) => (
                <li key={index}>{alat}</li>
              ))}
            </ul>
            <h3 className="text-base font-semibold mt-12">Langkah Membuat:</h3>
            <ol className="list-decimal list-inside text-black text-sm">
              {selectedCard.langkah.map((langkah, index) => (
                <li key={index}>{langkah}</li>
              ))}
            </ol>
          </div>
        )}
      </Modal>
    </div>
  );
}
