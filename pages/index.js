import { useState } from 'react'

const COUNTRIES = [
  {code:'NG',name:'Nigeria',curr:'NGN',sym:'₦',p1:10000,p2:20000,flag:'🇳🇬'},
  {code:'US',name:'USA',curr:'USD',sym:'$',p1:25,p2:49,flag:'🇺🇸'},
  {code:'GB',name:'UK',curr:'GBP',sym:'£',p1:20,p2:40,flag:'🇬🇧'},
  {code:'IN',name:'India',curr:'INR',sym:'₹',p1:2000,p2:4000,flag:'🇮🇳'},
  {code:'KE',name:'Kenya',curr:'KES',sym:'KSh',p1:3200,p2:6500,flag:'🇰🇪'},
]

export default function Home(){
  const [selected,setSelected]=useState(null)

  if(!selected){
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',display:'grid',placeItems:'center',padding:'16px',fontFamily:'sans-serif'}}>
        <div style={{background:'#111',border:'1px solid #222',borderRadius:'20px',padding:'28px',maxWidth:'600px',width:'100%'}}>
          <h1 style={{fontSize:'28px',fontWeight:900}}>🌍 INTER GLO</h1>
          <p style={{color:'#888',marginTop:'6px'}}>Choose country - Billing in your currency</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'20px'}}>
            {COUNTRIES.map(c=>(
              <button key={c.code} onClick={()=>setSelected(c)} style={{padding:'14px',background:'#1a1a1a',border:'1px solid #333',borderRadius:'14px',textAlign:'left',color:'#fff'}}>
                <div style={{fontSize:'20px'}}>{c.flag}</div>
                <div style={{fontWeight:700}}>{c.name}</div>
                <div style={{fontSize:'11px',color:'#888'}}>{c.curr} {c.sym}{c.p1}/{c.sym}{c.p2}</div>
              </button>
            ))}
          </div>
          <p style={{fontSize:'10px',color:'#555',marginTop:'16px',textAlign:'center'}}>Made in Anambra - From Onitsha to Global</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#000',color:'#fff',display:'grid',placeItems:'center',padding:'16px'}}>
      <div style={{background:'#111',border:'1px solid #222',borderRadius:'20px',padding:'28px',maxWidth:'600px',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <h2>{selected.flag} {selected.name} - {selected.curr}</h2>
          <button onClick={()=>setSelected(null)} style={{fontSize:'12px',color:'#888',background:'none',border:'none',textDecoration:'underline'}}>Change</button>
        </div>
        <h1 style={{fontSize:'24px',fontWeight:900,marginTop:'18px'}}>Pay in {selected.curr}</h1>
        <div onClick={()=>alert('Pay '+selected.sym+selected.p1)} style={{marginTop:'16px',padding:'18px',background:'#1a1a1a',border:'1px solid #333',borderRadius:'14px',cursor:'pointer'}}>
          <div style={{fontWeight:700}}>Own domain</div>
          <div style={{fontSize:'22px',fontWeight:900}}>{selected.sym}{selected.p1} {selected.curr}</div>
        </div>
        <div onClick={()=>alert('Pay '+selected.sym+selected.p2)} style={{marginTop:'12px',padding:'18px',background:'#fff',color:'#000',borderRadius:'14px',cursor:'pointer'}}>
          <div style={{fontWeight:700}}>Domain + Hosting</div>
          <div style={{fontSize:'22px',fontWeight:900}}>{selected.sym}{selected.p2} {selected.curr}</div>
        </div>
        <button onClick={()=>window.location.href='/builder'} style={{width:'100%',marginTop:'18px',padding:'16px',background:'#fff',color:'#000',borderRadius:'12px',fontWeight:800,border:'none'}}>Start Building →</button>
      </div>
    </div>
  )
}