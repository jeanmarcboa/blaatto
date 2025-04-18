"use client";
import React, { useState, useEffect, useCallback } from "react";
import PreLoader from "@/components/Common/BtnPreLoader";
import Breadcrumb from "../Common/Breadcrumb";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";

import orderAPI from "../../app/api/order";
import accountAPI from "../../app/api/account";
import sepMillier from "../Common/numberSeparator";

const Checkout = () => {
  const router = useRouter();
  const { id } = useParams();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  // const totalPrice = useSelector(selectTotalPrice);
  const [totalPrice, setTotalPrice] = useState("");
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, isLoggedIn } = useUser();

  const [billingInfo, setBillingInfo] = useState<any>({});

  const handleChangeBillingInfo = (e: any) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const groupItemsByShop = (items: any) => {
    const groupedItems: { shop: any; items: any[] }[] = [];

    items.forEach((item) => {
      const existingGroup = groupedItems.find(
        (group) => group.shop.id === item.shop.id
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groupedItems.push({
          shop: item.shop,
          items: [item],
        });
      }
    });

    console.log(groupedItems);

    return groupedItems;
  };

  const selectTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    const filterCart: any = groupItemsByShop(cartItems);
    const results = filterCart.filter((line: any) => line?.shop?.id == id);
    // setGroupedCart(

    // );
    // console.log("results", results);
    setSelectedCartItems(results[0]?.items);
    const tmpTotalPrice = selectTotalPrice(results[0]?.items);
    setTotalPrice(tmpTotalPrice);
  }, []);

  const createUserAccountFromBillingInfo = () => {
    console.log(billingInfo);
    let data = {
      lastname: billingInfo?.lastname,
      firstname: billingInfo?.firstname,
      email: billingInfo?.email,
      phoneNumber: billingInfo?.phoneNumber,
      username: billingInfo?.lastname,
      password: billingInfo?.password,
    };
    accountAPI
      .signUpCustomer(data)
      .then((response: any) => {
        console.log("User created successfully", response);
        setUserID(response.data.id);
        setTimeout(() => {
          setOrder(response.data.id);
        }, 2000);
      })
      .catch((error: any) => {
        console.error("Error creating user", error);
      });
  };

  const setOrder = (id: string) => {
    //extract cart items from selectedCartItems to order.products
    const orderProducts = selectedCartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const orderLogged = {
      accountId: id,
      products: orderProducts,
      email: billingInfo?.email,
      lastname: billingInfo?.lastname,
      firstname: billingInfo?.firstname,
    };
    const orderNologged = {
      products: orderProducts,
      email: billingInfo?.email,
      lastname: billingInfo?.lastname,
      firstname: billingInfo?.firstname,
    };
    orderAPI
      .createOrder(isLoggedIn ? orderLogged : orderNologged)
      .then((response) => {
        console.log("Order created successfully", response);
        // pay order and redirect to order confirmation page
        let payData = {
          deliveryAddress: billingInfo?.deliveryAddress,
          phoneNumber: billingInfo?.phoneNumber,
        };

        orderAPI
          .buyOrder(response.data.id, payData)
          .then((req) => {
            console.log("Order paid successfully", req);
            // router.push("/order/confirmation");
            window.location.href = req.data?.data?.gateway_payment_url;
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error paying order", error);
            setTimeout(() => {
              // router.push("/order/confirmation");
              router.push("/error");
              setLoading(false);
            }, 2000);
          });
      })
      .catch((error) => {
        console.error("Error creating order", error);
        setLoading(false);
        router.push("/error");
      });
  };

  const submitOrder = (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Validate billing info
    if (!billingInfo?.firstname || !billingInfo?.lastname) {
      alert("Veuillez remplir tous les détails de facturation");
      return;
    }

    // Submit order
    if (!isLoggedIn) {
      // createUserAccountFromBillingInfo();
      setOrder("");
    } else {
      setOrder(userInfo?.id);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setBillingInfo({
        lastname: userInfo?.lastname,
        firstname: userInfo?.firstname,
        email: userInfo?.email,
        phoneNumber: userInfo?.phoneNumber,
      });
      setUserID(userInfo.id);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                {!isLoggedIn && <Login />}

                {/* <!-- billing details --> */}
                <Billing
                  handleChangeBillingInfo={handleChangeBillingInfo}
                  billingInfo={billingInfo}
                  isLoggedIn={isLoggedIn}
                />
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Votre commande
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Produit</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Sous-total
                        </h4>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    {selectedCartItems.map((item, key) => (
                      <div
                        className="flex items-center justify-between py-5 border-b border-gray-3"
                        key={key}
                      >
                        <div>
                          <p className="text-dark">
                            {item.title} x {item.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-dark text-right">
                            {sepMillier(item.price * item.quantity)} FCFA
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* <!-- product item --> */}

                    {/* <!-- product item --> */}

                    {/* <!-- product item --> */}

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
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                {/* <Coupon /> */}

                {/* <!-- shipping box --> */}
                {/* <ShippingMethod /> */}

                {/* <!-- payment box --> */}
                {/* <PaymentMethod /> */}

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  onClick={submitOrder}
                  className="w-full flex justify-center font-medium text-white bg-green py-3 px-6 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading && "Commander maintenant"}
                  {loading && <PreLoader />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
