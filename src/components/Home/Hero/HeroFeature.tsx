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
    title: "Assistance dédiée 7j/7",
    description: "Partout et à tout moment",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-10 lg:pb-12.5 xl:pb-15 pt-10 lg:pt-12.5 xl:pt-15">
      <div className="flex flex-row flex-wrap items-center gap-4 xl:gap-6 mt-0">
        {featureData.map((item, key) => (
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-md w-[30%]"
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
              <h3 className="font-medium text-lg text-green">{item.title}</h3>
              <p className="text-sm text-dark">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
