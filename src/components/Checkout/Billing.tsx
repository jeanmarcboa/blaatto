import React from "react";

const Billing = ({ handleChangeBillingInfo, billingInfo, isLoggedIn }: any) => {
  return (
    <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
        Détails de facturation
      </h2>

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstname" className="block mb-2.5">
              Nom <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder=""
              value={billingInfo.firstname}
              onChange={handleChangeBillingInfo}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block mb-2.5">
              Prénom <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder=""
              value={billingInfo.lastname}
              onChange={handleChangeBillingInfo}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="phoneNumber" className="block mb-2.5">
            Téléphone <span className="text-red">*</span>
          </label>

          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={billingInfo.phoneNumber}
            onChange={handleChangeBillingInfo}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Email <span className="text-red">*</span>
          </label>

          <input
            type="email"
            name="email"
            id="email"
            value={billingInfo.email}
            onChange={handleChangeBillingInfo}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="country" className="block mb-2.5">
            Adresse de livraison
          </label>

          <input
            type="text"
            name="deliveryAddress"
            id="deliveryAddress"
            value={billingInfo.deliveryAddress}
            onChange={handleChangeBillingInfo}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Billing;
