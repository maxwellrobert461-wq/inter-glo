import { useEffect,useState } from 'react'

export default function Builder(){
  const [userCountry,setUserCountry]=useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('inter_country')
    if(saved) setUserCountry(JSON.parse(saved))
    else window.location.href = '/onboarding'
  },[])

  function pay(){
    if(!userCountry) return
    if(userCountry.currency==='NGN' || userCountry.currency==='KES' || userCountry.currency==='ZAR'){
      // PAYSTACK FOR AFRICA
      const handler = window.PaystackPop.setup({
        key: 'pk_live_YOUR_KEY',
        email: 'customer@interglo.com',
        amount: userCountry.price1*100,
        currency: userCountry.currency,
        callback: (res)=>{ alert('Paid in '+userCountry.currency); localStorage.setItem('paid','yes') }
      })
      handler.openIframe()
    }else{
      // STRIPE FOR GLOBAL
      window.location.href = `https://buy.stripe.com/YOUR_STRIPE_LINK?currency=${userCountry.currency}`
    }
  }

  if(!userCountry) return null

  return (
    <div style={{padding:'20px',fontFamily:'Inter'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>INTER GLO — {userCountry.flag} {userCountry.name} • {userCountry.currency}</h2>
        <button onClick={()=>{localStorage.clear(); location.href='/onboarding'}} style={{fontSize:'12px'}}>Change country</button>
      </div>

      <div style={{marginTop:'24px',border:'1px solid #eee',padding:'20px',borderRadius:'16px'}}>
        <h3>Pay in your currency: {userCountry.symbol}{userCountry.price1} - Own domain</h3>
        <h3>{userCountry.symbol}{userCountry.price2} - With domain</h3>
        <button onClick={pay} style={{marginTop:'12px',padding:'14px 24px',background:'#000',color:'#fff',borderRadius:'12px'}}>
          Pay {userCountry.symbol}{userCountry.price1} in {userCountry.currency}
        </button>
      </div>

      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  )
}