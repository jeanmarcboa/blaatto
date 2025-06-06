import { selectTotalPrice } from "@/redux/features/cart-slice";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import sepMillier from "../Common/numberSeparator";

const OrderSummary = ({ cartItems, shopId }) => {
  // const cartItems = useAppSelector((state) => state.cartReducer.items);
  // const totalPrice = useSelector(selectTotalPrice);

  const selectTotalPrice = (items) => {
    return items?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalPrice = selectTotalPrice(cartItems);

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">
            Récapitulatif de la commande
          </h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Produit</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Sous-total</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems?.map((item: any, key: number) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="text-dark">{item?.designation?.label}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  {sepMillier(item?.price * item?.quantity)} FCFA
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                {sepMillier(totalPrice)} FCFA
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <Link
            href={"/checkout/" + shopId}
            className="w-full flex justify-center font-medium text-white bg-green py-3 px-6 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
          >
            Processus de paiement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
