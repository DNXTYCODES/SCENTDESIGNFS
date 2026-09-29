import {useState} from 'react';import {useSearchParams} from 'react-router-dom';import {useShop} from '../store';import {Card} from '../components';
export default function Products(){const{products,categories,status,maxDisc}=useShop(),[sp,setSp]=useSearchParams(),cat=sp.get('cat')||'All',[q,setQ]=useState(''),[sort,setSort]=useState('');
 const cats=['All',...categories,...(maxDisc?['On sale']:[])];
 let l=products.filter(p=>(cat==='All'||(cat==='On sale'?p.disc>0:p.c===cat))&&(p.n+p.d).toLowerCase().includes(q.toLowerCase()));
 if(sort)l=[...l].sort((a,b)=>sort==='lo'?a.p[0][1]-b.p[0][1]:b.p[0][1]-a.p[0][1]);
 return <><div className="banner"><div className="wrap"><h2>Our perfumes</h2><p className="sub">Choose a size, add to cart, pay by transfer.</p></div></div>
 <div className="wrap" style={{paddingTop:26}}><div className="chips">{cats.map(c=><button key={c} className="chip" aria-pressed={c===cat} onClick={()=>setSp(c==='All'?{}:{cat:c})}>{c}</button>)}</div>
 <div className="tools"><div style={{flex:1,minWidth:200}}><input type="search" placeholder="Search perfumes" aria-label="Search perfumes" value={q} onChange={e=>setQ(e.target.value)}/></div><div style={{width:200}}><select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="">Sort: Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div></div>
 {status==='loading'&&<p className="sub">Loading…</p>}{status==='error'&&<p className="sub">Could not load products. Please refresh.</p>}
 <div className="grid">{l.map(p=><Card key={p.id} p={p}/>)}</div>{status==='ready'&&!l.length&&<p className="sub">No perfumes match. Try another search or category.</p>}</div></>}
