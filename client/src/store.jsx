import {createContext,useContext,useEffect,useMemo,useState,useCallback} from 'react';
const Ctx=createContext();export const useShop=()=>useContext(Ctx);
export function ShopProvider({children}){
 const[products,setProducts]=useState([]),[status,setStatus]=useState('loading'),[ui,setUi]=useState({drawer:false,view:null}),[toast,setToast]=useState('');
 const[cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('sdn_cart')||'[]')}catch{return[]}});
 useEffect(()=>{fetch('/api/catalog').then(r=>r.ok?r.json():Promise.reject()).then(j=>{setProducts(j.products);setStatus('ready')}).catch(()=>setStatus('error'))},[]);
 // reprice cart from the live catalogue (discounts may have changed)
 useEffect(()=>{if(status==='ready')setCart(c=>c.flatMap(i=>{const p=products.find(x=>x.id===i.id),s=p&&p.p.find(z=>z[0]===i.size);return s?[{...i,n:p.n,pr:s[1],o:s[2],img:p.img,col:p.col}]:[]}))},[products,status]);
 useEffect(()=>{try{localStorage.setItem('sdn_cart',JSON.stringify(cart))}catch{}},[cart]);
 const notify=useCallback(m=>{setToast(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setToast(''),2200)},[]);
 const add=(p,s)=>setCart(c=>{const k=p.id+'-'+s[0];return c.some(x=>x.k===k)?c.map(x=>x.k===k?{...x,q:x.q+1}:x):[...c,{k,id:p.id,size:s[0],unit:p.c==='Gift sets'?' set':'ml',n:p.n,pr:s[1],o:s[2],q:1,col:p.col,img:p.img}]});
 const qty=(k,d)=>setCart(c=>c.map(x=>x.k===k?{...x,q:x.q+d}:x).filter(x=>x.q>0));
 const categories=useMemo(()=>[...new Set(products.map(p=>p.c))],[products]);
 const v={products,status,cart,setCart,add,qty,notify,toast,ui,setUi,categories,count:cart.reduce((a,b)=>a+b.q,0),total:cart.reduce((a,b)=>a+b.pr*b.q,0),maxDisc:Math.max(0,...products.map(p=>p.disc))};
 return <Ctx.Provider value={v}>{children}</Ctx.Provider>}
