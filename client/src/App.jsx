import {useEffect} from 'react';import {Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import {useShop} from './store';import {Header,Footer,CartDrawer,ProductModal} from './components';
import Home from './pages/Home';import Products from './pages/Products';import About from './pages/About';import Contact from './pages/Contact';
const AdminRedirect=()=>{useEffect(()=>{location.replace('/admin.html')},[]);return null};
export default function App(){const nav=useNavigate(),{pathname}=useLocation(),{setUi,toast}=useShop();
 useEffect(()=>{window.scrollTo(0,0)},[pathname]);
 // any element with data-go (and optional data-cat) navigates client-side
 useEffect(()=>{const h=e=>{const g=e.target.closest('[data-go]');if(!g)return;e.preventDefault();const t=g.dataset.go,c=g.dataset.cat;setUi({drawer:false,view:null});nav((t==='home'?'/':'/'+t)+(c&&c!=='All'?'?cat='+encodeURIComponent(c):''))};document.addEventListener('click',h);return()=>document.removeEventListener('click',h)},[nav,setUi]);
 useEffect(()=>{const k=e=>e.key==='Escape'&&setUi({drawer:false,view:null});document.addEventListener('keydown',k);return()=>document.removeEventListener('keydown',k)},[setUi]);
 return <><Header/><main><div className="tab on" key={pathname}><Routes><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin" element={<AdminRedirect/>}/><Route path="*" element={<div className="wrap pagehead"><h2>Page not found</h2><p><button className="btn" data-go="home">Go home</button></p></div>}/></Routes></div></main><Footer/>
 <a className="wafab" href="#" data-go="contact" aria-label="Chat with us">💬<span className="wt"> Chat with us</span></a><CartDrawer/><ProductModal/><div className="toast" role="status" style={{display:toast?'block':'none'}}>{toast}</div></>}
