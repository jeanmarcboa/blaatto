// pages/admin/add-product.js
"use client";

import { useState, useEffect } from "react";
import PreLoader from "@/components/Common/BtnPreLoader";
import SingleOrderItem from "@/components/Orderstlist/SingleOrderItem";
import product from "@/app/api/productServices";
import categ from "@/app/api/categoriesServices";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const fetchCategories = () => {
    categ
      .categorieList()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de récupération des catégories:");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("label", productName);
    formData.append("description", description);
    formData.append("currency", "XOF");
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categoryId", category);
    // formData.append("shopId", shopId);
    // images.forEach((image, index) => formData.append("images", image));

    // Envoi des données au backend
    product
      .createProduct(formData)
      .then((data) => {
        console.log("Produit ajouté avec succès:", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Détails Commande
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-row flex-wrap gap-5">
          <div className="xl:max-w-[70%] w-full">
            {/* Informations Générales */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Informations Générales
                </h2>
              </div>
              <div className="p-6 flex flex-row flex-wrap gap-4">
                <div className="md:w-[36%]">
                  <h3 className="font-bold">Général</h3>
                  <div>
                    <p>Date de création :</p>
                    <span>10-02-2-2024, 15h15</span>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Etat
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Choisir un état</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:w-[30%]">
                  <h3 className="font-bold">Facturation</h3>
                  <div className="flex flex-col">
                    <span>Christian Kendja</span>
                    <span>Avenue Houdaille, Immeuble Ecobank</span>
                    <span>Abidjan</span>
                    <span>Plateau</span>
                    <span>01BP4107</span>
                  </div>
                  <div>
                    <h3 className="font-bold mt-4">Email</h3>
                    <div>
                      <span>asdfhjj@gmail.com</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mt-4">Téléphone</h3>
                    <div>
                      <span>0749805690</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-[30%]">
                  <h3 className="font-bold">Expédition</h3>
                  <div className="flex flex-col">
                    <span>Christian Kendja</span>
                    <span>Avenue Houdaille, Immeuble Ecobank</span>
                    <span>Abidjan</span>
                    <span>Plateau</span>
                    <span>01BP4107</span>
                  </div>
                  <div>
                    <h3 className="font-bold mt-4">Téléphone</h3>
                    <div>
                      <span>0749805690</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Détails du Produit */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4 mt-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Articles
                </h2>
              </div>
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <div>
                    {/* <!-- table header --> */}
                    <div className="flex items-center py-5.5 px-10">
                      {/* <div className="min-w-[83px]"></div> */}
                      <div className="min-w-[75%]">
                        <p className="text-dark">Article</p>
                      </div>

                      <div className="min-w-[10%]">
                        <p className="text-dark text-right">Coût</p>
                      </div>

                      <div className="min-w-[5%]">
                        <p className="text-dark text-right">Qté</p>
                      </div>
                      <div className="min-w-[10%]">
                        <p className="text-dark text-right">Total</p>
                      </div>
                    </div>

                    {/* <!-- wish item --> */}
                    {/* {orders.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))} */}
                    {/* <SingleOrderItem/> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:max-w-[25%] w-full">
            {/* Bouton de soumission */}
            <div className="rounded-xl bg-white shadow-1 border-[1px] border-solid border-gray-4">
              <div className="border-b-[1px] border-solid border-gray-4 pl-6 pr-6 pt-2 pb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Actions de commande
                </h2>
              </div>
              <div className="p-6">
                <button
                  type="submit"
                  className="flex flex-row justify-center w-full text-center font-medium text-custom-sm text-white bg-green py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-green-dark mt-7.5"
                >
                  {!loading ? "Mettre à jour" : <PreLoader />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
