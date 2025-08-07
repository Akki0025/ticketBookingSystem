import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const RechargeWallet = () => {
  const { authUser, rechargeWallet, isRechargingWallet,updateWalletBalance } = useAuthStore();
  const [amount, setAmount] = useState("");

 
  const handleRecharge = async () => {
    const amt = parseInt(amount);
    if (amt <= 0 || isNaN(amt)) {
      return alert("Please enter a valid amount");
    }

    await rechargeWallet(amt); // rechargeWallet updates wallet + handles balance

    setAmount(""); // Reset amount input
  };

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <h2 className="text-2xl font-semibold mb-4">Wallet Balance: ₹{authUser.walletBalance}</h2>

      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter recharge amount"
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleRecharge}
        disabled={isRechargingWallet}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        {isRechargingWallet ? "Processing..." : "Recharge"}
      </button>
    </div>
  );
};

export default RechargeWallet;
