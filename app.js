require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const RentCal=require('./models/rent_cal');
const Users=require('./models/users');
const bodyParser=require('body-parser');
const path=require('path');
const multer=require('multer');



const app=express();

mongoose.connect('mongodb+srv://admin:1249712561@cluster0.upixr.mongodb.net/cruddb', {
  
    
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error("Connection error", err);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
const PORT=process.env.PORT || 5000;
//database connect


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
  });
  const upload = multer({ storage: storage });


app.use(express.urlencoded({ extended:false}));

app.set('view engine', 'ejs');
app.use(express.json());


// Routes
app.get('/rent_cal', (req, res) => {
  res.render('rent_cal');
});
////get table users
app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({ error: 'No users found' });
    }
    console.log(users.image);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});
///////////////
app.get('/contenttable',(req,res)=>{
  res.render('contenttable');
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('edit', { user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user for edit' });
  }
});

// Replace basic upload middleware with configured version
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/contenttable',(req,res)=>{
    res.render('contenttable');
});



// ***************************************POST*********************************
// ***************************************POST*********************************
// ***************************************POST*********************************
app.post('/api/rent_cal', async (req, res) => {
    try {
      const {
        room,
        fire_unitbefore,
        fire_unitafter,
        water_unitbefore,
        water_unitafter,
        price_per_unit_fire,
        price_per_unit_water,
        price_room,
    
      } = req.body;

      //แปลงค่าเป็นตัวเลข
      const fireUnitBefore = parseFloat(fire_unitbefore);
      const fireUnitAfter = parseFloat(fire_unitafter);
      const waterUnitBefore = parseFloat(water_unitbefore);
      const waterUnitAfter = parseFloat(water_unitafter);
      const pricePerUnitFire = parseFloat(price_per_unit_fire);
      const pricePerUnitWater = parseFloat(price_per_unit_water);
      const priceRoom = parseFloat(price_room);
      // คำนวณค่ารวม
      const total_fire = (fireUnitAfter - fireUnitBefore) * pricePerUnitFire;
    const total_water = (waterUnitAfter - waterUnitBefore) * pricePerUnitWater;
    const total_amount = total_fire + total_water + priceRoom;
      // บันทึกข้อมูลลง MongoDB
      const rentCal = new RentCal({
        room,
        fire_unitbefore: fireUnitBefore,
        fire_unitafter: fireUnitAfter,
        water_unitbefore: waterUnitBefore,
        water_unitafter: waterUnitAfter,
        price_per_unit_fire: pricePerUnitFire,
        price_per_unit_water: pricePerUnitWater,
        price_room: priceRoom,
        total_fire,
        total_water,
        total_amount,
      });
  
      await rentCal.save();
      
      res.status(201).json({ message: `Rent calculation saved successfully! ${total_amount}` });
     
    } catch (error) {
      console.error("Error saving rent calculation:", error);
      res.status(500).json({ error: "Failed to save rent calculation" });
    }
  });


  ////post users
  app.post('/api/users', upload.single('image'), async (req, res) => {
    try {
      const { room, name, citizenid, tel, carinfo } = req.body;
  
      // Save the file path to the image
      const imagePath = req.file.filename;
  
      const newUser = new Users({
        image: `/uploads/${req.file.filename}`,
        room,
        name,
        citizenid,
        tel,
        carinfo,
      });
  
      // Save the user to the database
      await newUser.save();
      res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });
    // Log model instance before saving
    


    ///test


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})