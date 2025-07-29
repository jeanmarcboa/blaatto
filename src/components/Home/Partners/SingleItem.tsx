import { Category } from "@/types/category";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const SingleItem = ({ item }: { item: any }) => {
  return (
    <Link
      href="/"
      className="group flex flex-col items-center"
    >
      <div className="max-w-[130px] w-full h-32.5 flex items-center justify-center mb-4">
        <Image
          src={item.img ?? "/images/sellers/marketplace.png"}
          alt="Category"
          width={102}
          height={82}
        />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-green to-green bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-green">
          {item?.label}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;
