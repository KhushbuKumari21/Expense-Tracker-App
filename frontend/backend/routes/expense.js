const router = require('express').Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');


//  GET ALL EXPENSES
router.get('/', auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  res.json(data);
});


// ADD EXPENSE
router.post('/', auth, async (req, res) => {
  const exp = new Expense({
    ...req.body,
    userId: req.user.id
  });

  await exp.save();
  res.json(exp);
});


//  UPDATE EXPENSE
router.put('/:id', auth, async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});


// DELETE EXPENSE
router.delete('/:id', auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});


//  CATEGORY SUMMARY 
router.get('/summary', auth, async (req, res) => {
  try {
    const data = await Expense.aggregate([
      {
        $match: { userId: req.user.id }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ msg: "Error generating summary" });
  }
});


module.exports = router;