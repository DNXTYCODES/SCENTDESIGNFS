const path=require('path');require('dotenv').config({path:path.join(__dirname,'.env')});
const mongoose=require('mongoose'),{Product}=require('./models');
(async()=>{await mongoose.connect(process.env.MONGO_URI);
 if(await Product.countDocuments()){console.log('Products already exist, nothing seeded.')}
 else{await Product.insertMany(require('./seed.json'),{ordered:true});console.log('Seeded products.')}
 await mongoose.disconnect()})().catch(e=>{console.error(e.message);process.exit(1)});
