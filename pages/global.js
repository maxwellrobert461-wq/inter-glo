<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>INTER GLO - Global Builder</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://js.paystack.co/v1/inline.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;900&display=swap" rel="stylesheet">
</head>
<body style="font-family:Inter;background:#000;color:#fff;min-height:100vh;display:grid;place-items:center;padding:20px">

<div id="app" style="max-width:700px;width:100%"></div>

<script>
const COUNTRIES = [
  {code:'NG',name:'Nigeria',lang:'en',currency:'NGN',symbol:'₦',p1:10000,p2:20000,flag:'🇳🇬',pay:'paystack'},
  {code:'US',name:'United States',lang:'en',currency:'USD',symbol:'$',p1:25,p2:49,flag:'🇺🇸',pay:'stripe',link:'https://buy.stripe.com/test_28o5kE'},
  {code:'GB',name:'United Kingdom',lang:'en',currency:'GBP',symbol:'£',p1:20,p2:40,flag:'🇬🇧',pay:'stripe',link:'https://buy.stripe.com/test_28o5kE'},
  {code:'IN',name:'India',lang:'en',currency:'INR',symbol:'₹',p1:2000,p2:4000,flag:'🇮🇳',pay:'stripe',link:'https://buy.stripe.com/test_28o5kE'},
  {code:'KE',name:'Kenya',lang:'en',currency:'KES',symbol:'KSh',p1:3200,p2:6500,flag:'🇰🇪',pay:'paystack'},
  {code:'ZA',name:'South Africa',lang:'en',currency:'ZAR',symbol:'R',p1:450,p2:900,flag:'🇿🇦',pay:'paystack'},
  {code:'DE',name:'Germany',lang:'de',currency:'EUR',symbol:'€',p1:23,p2:45,flag:'🇩🇪',pay:'stripe',link:'https://buy.stripe.com/test_28o5kE'},
  {code:'BR',name:'Brazil',lang:'pt',currency:'BRL',symbol:'R$',p1:125,p2:250,flag:'🇧🇷',pay:'stripe',link:'https://buy.stripe.com/test_28o5kE'},
]

const LANG = {
  en:{title:'Welcome to INTER GLO',sub:'Choose your country — Billing in your currency',own:'Own domain (ZIP)',with:'Domain + Hosting + SSL',btn:'Continue to Build'},
  de:{title:'Willkommen bei INTER GLO',sub:'Wähle dein Land — Abrechnung in deiner Währung',own:'Eigene Domain',with:'Domain + Hosting + SSL',btn:'Weiter zum Bauen'},
  pt:{title:'Bem-vindo ao INTER GLO',sub:'Escolha seu país — Cobrança na sua moeda',own:'Domínio próprio',with:'Domínio + Hospedagem + SSL',btn:'Continuar para Construir'},
}

let selected = JSON.parse(localStorage.getItem('inter_glo_country')||'null')

function render(){
  const app=document.getElementById('app')
  if(!selected){
    app.innerHTML = `
      <div style="background:#111;border:1px solid #222;border-radius:24px;padding:32px">
        <h1 style="font-size:30px;font-weight:900">🌍 INTER GLO</h1>
        <p style="color:#888;margin-top:6px">Choose your country — Billing will be in your currency</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px">
          ${COUNTRIES.map(c=>`
            <button onclick="choose('${c.code}')" style="padding:16px;background:#1a1a1a;border:1px solid #333;border-radius:16px;text-align:left">
              <div style="font-size:22px">${c.flag}</div>
              <div style="font-weight:700;margin-top:4px">${c.name}</div>
              <div style="font-size:12px;color:#888">${c.currency} ${c.symbol}${c.p1} / ${c.symbol}${c.p2}</div>
            </button>`).join('')}
        </div>
        <p style="font-size:11px;color:#555;margin-top:20px;text-align:center">Made in Anambra, Nigeria — From Onitsha Main Market to Global</p>
      </div>`
  }else{
    const t=LANG[selected.lang]||LANG.en
    app.innerHTML=`
      <div style="background:#111;border:1px solid #222;border-radius:24px;padding:32px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h2 style="font-size:22px;font-weight:800">${selected.flag} ${selected.name} — ${selected.currency}</h2>
          <button onclick="resetCountry()" style="font-size:12px;color:#888;text-decoration:underline">Change</button>
        </div>
        <h1 style="font-size:26px;font-weight:900;margin-top:20px">${t.title}</h1>
        <p style="color:#888">${t.sub}</p>
        
        <div style="margin-top:20px;display:grid;gap:12px">
          <div onclick="pay(${selected.p1})" style="border:1px solid #333;padding:20px;border-radius:16px;cursor:pointer;background:#1a1a1a">
            <div style="font-weight:700">${t.own}</div>
            <div style="font-size:24px;font-weight:900;margin-top:4px">${selected.symbol}${selected.p1.toLocaleString()} ${selected.currency}</div>
            <div style="font-size:12px;color:#888;margin-top:6px">Pay once, download ZIP, deploy anywhere</div>
          </div>
          <div onclick="pay(${selected.p2})" style="border:1px solid #fff;padding:20px;border-radius:16px;cursor:pointer;background:#fff;color:#000">
            <div style="font-weight:700">${t.with}</div>
            <div style="font-size:24px;font-weight:900;margin-top:4px">${selected.symbol}${selected.p2.toLocaleString()} ${selected.currency}</div>
            <div style="font-size:12px;color:#555;margin-top:6px">We host + domain + SSL</div>
          </div>
        </div>
        
        <button onclick="pay(${selected.p1})" style="width:100%;margin-top:20px;padding:16px;background:#fff;color:#000;border-radius:12px;font-weight:800;font-size:16px">Pay ${selected.symbol}${selected.p1} — Start Building →</button>
        <p style="font-size:11px;color:#555;margin-top:12px;text-align:center">Secure payment via ${selected.pay==='paystack'?'Paystack':'Stripe'} • Anambra to the World 🌍</p>
      </div>`
  }
}

function choose(code){
  selected=COUNTRIES.find(c=>c.code===code)
  localStorage.setItem('inter_glo_country',JSON.stringify(selected))
  render()
}

function resetCountry(){
  localStorage.removeItem('inter_glo_country')
  selected=null
  render()
}

function pay(amount){
  if(selected.pay==='paystack'){
    // REPLACE pk_test_xxx WITH YOUR PAYSTACK LIVE KEY
    var handler=PaystackPop.setup({
      key:'pk_test_xxxxxxxx',
      email:'customer@inter-glo.com',
      amount:amount*100,
      currency:selected.currency,
      callback:function(res){alert('Payment success in '+selected.currency+'! ID: '+res.reference); localStorage.setItem('paid','yes'); window.location.href='/builder'}
    })
    handler.openIframe()
  }else{
    alert('Redirecting to Stripe in '+selected.currency+' - '+selected.symbol+amount)
    window.open(selected.link+'?amount='+amount+'&currency='+selected.currency,'_blank')
  }
}

render()
</script>
</body>
</html>