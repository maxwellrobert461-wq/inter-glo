// Auto-detect country from IP - No need choose manually if you want
fetch('https://ipapi.co/json/').then(r=>r.json()).then(data=>{
  const countryCode = data.country_code // NG, US, IN...
  // Match to COUNTRIES list and set billing
})