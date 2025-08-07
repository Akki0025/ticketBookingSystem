import User from '../models/User.js';

export const getWallet = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ walletBalance: user.walletBalance });
};

export const rechargeWallet = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid recharge amount" });
  }

  user.walletBalance += amount;
  await user.save();
  res.json({ walletBalance: user.walletBalance });
};
