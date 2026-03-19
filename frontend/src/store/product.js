import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    try {
      const res = await axios.post("/api/products", newProduct);
      const data = res.data;
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "product created" };
    } catch (error) {
      console.log("error in create product(zustand):", error.message);
      return { success: false, message: "Error create product zustand" };
    }
  },
  fetchProducts: async () => {
    const res = await axios.get("/api/products");
    const data = res.data;
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await axios.delete(`api/products/${pid}`);
    const data = res.data;
    console.log(data);
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: (pid) => {},
}));

//fetch-axios
