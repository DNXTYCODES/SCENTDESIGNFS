import {CV,Social,MsgForm} from '../components';
export default function Contact(){return(<><div className="wrap">
</div><div className="banner"><div className="wrap"><h2>Contact us</h2><p className="sub">Questions about a perfume or an order? Reach us any of these ways.</p></div></div><div className="wrap" style={{paddingTop:'26px'}}>
<div className="two"><div>
<div className="card"><h3>Visit us</h3><p>7 Oyesina Close, opposite 7 Ibikunle Avenue,<br/>Old Bodija, Ibadan, Nigeria</p><p><b>Opening hours:</b> <span className="todo">to be added</span></p></div>
<div className="card" style={{marginTop:'16px'}}><h3>Talk to us</h3><p><b>WhatsApp:</b> <CV k="wa"/><br/><b>Phone:</b> <CV k="ph"/><br/><b>Email:</b> <CV k="em"/></p>
<h3 style={{marginTop:'16px'}}>Social media</h3><Social/></div></div>
<div><MsgForm/>
<div className="card" style={{marginTop:'16px',textAlign:'center',minHeight:'120px',display:'grid',placeItems:'center'}}><span className="todo">Google Map of the shop to be embedded here</span></div></div></div>
</div></>)}
