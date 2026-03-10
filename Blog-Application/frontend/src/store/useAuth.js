import { create } from "zustand";
import axios from "axios";
import { loadingClass } from "../styles/common";

export const useAuth = create((set) => ({

  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (userCredWithRole) => {

    try {

      set({ loading: true, error: null });

      // remove role before sending request
      const { role, ...userCredObj } = userCredWithRole;

      const res = await axios.post( "http://localhost:4000/common-api/login",userCredObj,{ withCredentials: true });

      console.log("res is", res);

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      });

    } 
    catch (err) {

      console.log("error is", err);

      set({
        error: err.response?.data?.message || "Login failed",
        loading: false
        
      });

    }
  },

  logout: async () => {

  try {

    set({ loading: true, error: null });

    const res = await axios.get(
      "http://localhost:4000/common-api/logout",
      { withCredentials: true }
    );

    console.log("logout success", res.data);

    set({
      currentUser: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });

  } 
  catch (err) {

    console.log("logout error", err);

    set({
      loading: false,
      error: "Logout failed"
    });

  }

}
}));