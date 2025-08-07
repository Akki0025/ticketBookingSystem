import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    myBookings: [],
    isLoadingBookings: false,

    setAuthUser: (user) => set(() => ({ authUser: user, walletBalance: user.walletBalance })),
    updateWalletBalance: (newBalance) =>
        set((state) => ({
            walletBalance: newBalance,
            authUser: { ...state.authUser, walletBalance: newBalance },
        })),

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/login", data);
            console.log(res);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    fetchWalletBalance: async () => {
        set({ isFetchingWallet: true });
        try {
            const res = await axiosInstance.get("/wallet");
            // Update the authUser walletBalance directly
            set((state) => ({
                authUser: { ...state.authUser, walletBalance: res.data.balance },
            }));
        } catch (error) {
            toast.error("Failed to fetch wallet balance");
        } finally {
            set({ isFetchingWallet: false });
        }
    },

    rechargeWallet: async (amount) => {
        if (amount <= 0) {
            toast.error("Enter valid amount");
            return;
        }
        set({ isRecharging: true });
        try {
            const res = await axiosInstance.post("/wallet/recharge", { amount });
            // Update the authUser walletBalance directly
            set((state) => ({
                authUser: { ...state.authUser, walletBalance: res.data.balance },
            }));
            toast.success("Wallet recharged successfully");
        } catch (error) {
            toast.error("Recharge failed");
        } finally {
            set({ isRecharging: false });
        }
    },

    fetchBookings: async () => {
        set({ isLoadingBookings: true });
        try {
            const response = await axiosInstance.get('/bookings');
            set({ myBookings: response.data });
        } catch (error) {
            toast.error('Failed to fetch bookings');
        } finally {
            set({ isLoadingBookings: false });
        }
    }
}));