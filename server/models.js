const m=require('mongoose');
const Product=m.model('Product',new m.Schema({n:{type:String,required:true,trim:true,maxlength:80},c:{type:String,required:true,trim:true,maxlength:40,index:true},
 p:{type:[[Number]],validate:v=>v.length>0},d:{type:String,maxlength:500,default:''},col:{type:String,default:'#7a1fc4'},f:{type:Number,default:0},img:{type:String,default:''},imgId:{type:String,default:''},
 discount:{pct:Number,end:String}},{timestamps:true}),'sdn_products');
const CatDiscount=m.model('CatDiscount',new m.Schema({category:{type:String,unique:true,required:true},pct:{type:Number,required:true},end:String}),'sdn_catdiscounts');
module.exports={Product,CatDiscount};
