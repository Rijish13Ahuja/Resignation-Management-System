const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resignation = require('../models/Resignation');
const checkHoliday = require('../services/holidays');
const sendEmail = require('../services/email');

router.post('/', auth(['employee']), async (req, res) => {
  try {
    const user = req.user;
    const intendedLastDay = new Date(req.body.intendedLastDay);
    
    if ([0, 6].includes(intendedLastDay.getDay())) {
      return res.status(400).json({ error: 'Cannot select weekend date' });
    }

    if (await checkHoliday(user.country, intendedLastDay)) {
      return res.status(400).json({ error: 'Selected date is a national holiday' });
    }

    if (!req.body.reason || req.body.reason.length < 20) {
      return res.status(400).json({ error: 'Reason must be at least 20 characters' });
    }

    const resignation = new Resignation({
      reason: req.body.reason,
      intendedLastDay,
      employee: user._id
    });

    await resignation.save();
    res.status(201).json(resignation);
  } catch (error) {
    res.status(400).json({ 
      error: error.message || 'Failed to process resignation request' 
    });
  }
});

router.get('/', auth(['hr', 'employee']), async (req, res) => {
  try {
    const query = req.user.role === 'hr' ? {} : { employee: req.user._id };
    const resignations = await Resignation.find(query)
      .populate('employee', 'username email country');
    res.send(resignations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id/approve', auth(['hr']), async (req, res) => {
  try {
    const resignation = await Resignation.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'approved',
        exitDate: req.body.exitDate
      },
      { new: true }
    ).populate('employee');

    sendEmail(
      resignation.employee.email,
      'Resignation Approved',
      `Your resignation has been approved. Exit date: ${resignation.exitDate}`
    );

    res.send(resignation);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;