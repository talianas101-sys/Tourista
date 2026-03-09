export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { category, query } = req.query;
  const FSQ_KEY = 'BI2HSE1DFQNVYSFPHDXWJR2AMJQBTCLX1UVUYVSRWH4JJO1H';
  
  const CAT_MAP = {
    restaurant: '13000',
    tourist_attraction: '16000',
    lodging: '19014',
    night_club: '10032',
    shopping_mall: '17069',
    spa: '11127',
  };

  const catId = CAT_MAP[category] || '13000';
  const q = query ? `&query=${encodeURIComponent(query)}` : '';
  const url = `https://api.foursquare.com/v3/places/search?ll=33.5731,-7.5898&radius=10000&categories=${catId}&limit=20&fields=fsq_id,name,location,rating,stats,hours,price,photos${q}`;

  try {
    const resp = await fetch(url, {
      headers: { 'Authorization': FSQ_KEY, 'Accept': 'application/json' }
    });
    const data = await resp.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
