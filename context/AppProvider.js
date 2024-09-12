import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../redux/reducer/productReducer";

const AppContext = createContext();

const API = " https://api.seedley.net/jobs";
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  candidates: [],
  candidatesLoading: false,
  candidatesError: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getCandidates = async (url) => {
    dispatch({ type: "SET_CANDIDATES_LOADING" });
    try {
      const res = await axios.get(url);
      const candidates = await res.data;
      dispatch({ type: "SET_CANDIDATES_DATA", payload: candidates });
    } catch (error) {
      dispatch({ type: "SET_CANDIDATES_ERROR" });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
 
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };