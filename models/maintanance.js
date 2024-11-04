// models/Maintanance.js
const mongoose = require('mongoose');

const MaintananceSchema = new mongoose.Schema({
  room: {
    type: Number, // หรือ String หากคุณต้องการให้เป็นข้อความ
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'รอดำเนินการ'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const maintanance = mongoose.model('maintanance', MaintananceSchema);

module.exports = maintanance;
