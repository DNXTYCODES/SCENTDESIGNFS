// Copies products from the OLD database into the new sdn_products collection. Read-only on the old data.
// Usage: node migrate-old.js --dry   (preview)   |   node migrate-old.js   (write)
const path=require('path');require('dotenv').config({path:path.join(__dirname,'.env')});
const mongoose=require('mongoose'),{Product}=require('./models'),dry=process.argv.includes('--dry');
(async()=>{await mongoose.connect(process.env.MONGO_URI);
 const old=await mongoose.connection.client.db(process.env.LEGACY_DB||'e-commerce').collection('products').find().toArray();
 const docs=old.map(o=>{const price=Math.round(+o.price)||0,sz=(Array.isArray(o.sizes)?o.sizes:[]).map(s=>parseInt(s)).filter(n=>n>0);
  return{n:String(o.name||'').trim(),c:String(o.category||'Unisex').trim(),d:String(o.description||'').slice(0,500),f:o.bestseller?1:0,
   img:Array.isArray(o.image)?o.image[0]||'':o.image||'',p:(sz.length?sz:[100]).map(s=>[s,price]),col:'#7a1fc4'}}).filter(d=>d.n&&d.p[0][1]>0);
 console.log('Old products found:',old.length,'| usable:',docs.length);console.log(JSON.stringify(docs.slice(0,3),null,1));
 if(!dry){if(await Product.countDocuments())throw Error('sdn_products is not empty; aborting');await Product.insertMany(docs);console.log('Migrated.')}
 await mongoose.disconnect()})().catch(e=>{console.error(e.message);process.exit(1)});
