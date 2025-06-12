// Usage: node exchange-foursquare-token.js <clientId> <clientSecret> <redirectUri> <code>
// Example: node exchange-foursquare-token.js ABC123 DEF456 http://localhost:3000/swarm CODE789

const [,, clientId, clientSecret, redirectUri, code] = process.argv;

if (!clientId || !clientSecret || !redirectUri || !code) {
  console.error('Usage: node exchange-foursquare-token.js <clientId> <clientSecret> <redirectUri> <code>');
  process.exit(1);
}

const url = `https://foursquare.com/oauth2/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`;

(async () => {
  try {
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();
    if (data.access_token) {
      console.log('Access Token:', data.access_token);
    } else {
      console.error('Error:', data);
    }
  } catch (err) {
    console.error('Request failed:', err);
  }
})(); 