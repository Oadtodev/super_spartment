const express = require('express');
const mongoose=require('mongoose');
const db = async () => {
    try {
      // URL ของ MongoDB สามารถใช้ "mongodb://localhost:27017/ชื่อฐานข้อมูล" สำหรับ Local หรือ ใช้ MongoDB Atlas URL สำหรับ Remote
      await mongoose.connect('mongodb://localhost:27017/nodejs_crud_ejs');
      console.log("MongoDB Connected...");
      
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    //   process.exit(1); // ออกจากโปรแกรมหากเชื่อมต่อไม่ได้
    }
};
module.exports = db;