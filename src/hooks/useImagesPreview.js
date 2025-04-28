import { useDispatch, useSelector } from "react-redux";
import { updateproductImages } from "../redux/features/product-images";

const useUser = () => {
  const { value } = useSelector((state) => state?.productImagesReducer);
  const productImages = value;
  const dispatch = useDispatch();

  const setUpdateproductImages = (userData) => {
    dispatch(updateproductImages(userData));
  };

  return { productImages, setUpdateproductImages };
};

export default useUser;
