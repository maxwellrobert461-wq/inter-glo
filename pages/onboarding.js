import { useState } from 'react'

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', lang: 'en', currency: 'NGN', symbol: '₦', price1: 10000, price2: 20000, flag: '🇳🇬' },
  { code: 'US', name: 'United States', lang: 'en', currency: 'USD', symbol: '$', price1: 25, price2: 49, flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', lang: 'en', currency: 'GBP', symbol: '£', price1: 20, price2: 40, flag: '🇬🇧' },
  { code: 'IN', name: 'India', lang: 'en', currency: 'INR', symbol: '₹', price1: 2000, price2: 4000, flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', lang: 'pt', currency: 'BRL', symbol: 'R$', price1: 125, price2: 250, flag: '🇧🇷' },
  { code: 'KE', name: 'Kenya', lang: 'en', currency: 'KES', symbol: 'KSh', price1: 3200, price2: 6500, flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', lang: 'en', currency: 'ZAR', symbol: 'R', price1: 450, price2: 900, flag: '🇿🇦' },
  { code: 'DE', name: 'Germany', lang: 'de', currency: 'EUR', symbol: '€', price1: 23, price2: 45, flag: '🇩🇪' },
]

const LANGS = {
  en: { choose: "Choose your country", pay: "Pay to build", own: "Own domain", withDomain: "With domain + hosting" },
  pt: { choose: "Escolha seu país", pay: "Pagar para construir", own: "Domínio próprio", withDomain: "Com domínio + hospedagem" },
  de: { choose: "Wähle dein Land", pay: "Zum Bauen bezahlen", own: "Eigene Domain", withDomain: "Mit Domain + Hosting" },
}

export default function Onboarding(){
  const [country,setCountry]=useState(null)
  const [step,setStep]=useState(1)

  function select(c){
    localStorage.setItem('inter_country', JSON.stringify(c))
    setCountry(c)
    setStep(2)
    // Auto-detect and redirect
    window.location.href = `/builder?country=${c.code}`
  }

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',fontFamily:'Inter',background:'#000',color:'#fff',padding:'20px'}}>
      <div style={{maxWidth:'600px',width:'100%',background:'#111',padding:'32px',borderRadius:'24px',border:'1px solid #222'}}>
        {step===1 && (
          <>
            <h1 style={{fontSize:'28px',fontWeight:900}}>🌍 Welcome to INTER GLO</h1>
            <p style={{color:'#888',marginTop:'8px'}}>Choose your country — Billing will be in your currency</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginTop:'24px'}}>
              {COUNTRIES.map(c=>(
                <button key={c.code} onClick={()=>select(c)} style={{padding:'16px',background:'#1a1a1a',border:'1px solid #333',borderRadius:'16px',textAlign:'left',color:'#fff'}}>
                  <div style={{fontSize:'24px'}}>{c.flag}</div>
                  <div style={{fontWeight:700,marginTop:'4px'}}>{c.name}</div>
                  <div style={{fontSize:'12px',color:'#888'}}>{c.currency} • {c.symbol}{c.price1}/{c.symbol}{c.price2}</div>
                </button>
              ))}
            </div>
            <p style={{fontSize:'11px',color:'#555',marginTop:'20px',textAlign:'center'}}>Made in Anambra, Nigeria — For the World</p>
          </>
        )}
      </div>
    </div>
  )
}