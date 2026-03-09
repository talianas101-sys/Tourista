export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { fsq_id } = req.query;
  const FSQ_KEY = 'BI2HSE1DFQNVYSFPHDXWJR2AMJQBTCLX1UVUYVSRWH4JJO1H';
  
  try {
    const resp = await fetch(`https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=4`, {
      headers: { 'Authorization': FSQ_KEY, 'Accept': 'application/json' }
    });
    const data = await resp.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
