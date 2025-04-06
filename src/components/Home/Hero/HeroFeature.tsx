import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Service de livraison",
    description: "Livraison à vos frais",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "Paiements 100% sécurisés",
    description: "Garantir des paiements sécurisés",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "Assistance dédiée 24h/24 et 7j/7",
    description: "Partout et à tout moment",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-4 xl:gap-6 mt-0">
        {featureData.map((item, key) => (
          <div
            className="flex items-center gap-4 bg-green p-4 rounded-md w-full"
            key={key}
          >
            <Image
              src={item.img}
              alt="icons"
              width={40}
              height={41}
              color="#fff"
            />

            <div>
              <h3 className="font-medium text-lg text-white">{item.title}</h3>
              <p className="text-sm text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
