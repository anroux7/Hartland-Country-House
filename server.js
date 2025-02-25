export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    
    // Serve index.html for the root path
    if (url.pathname === "/") {
      return fetch("https://hartlandcountryhouse.co.za/public/index.html");
    }

    // Serve other static files (JS, CSS, Images)
    return fetch(`https://hartlandcountryhouse.co.za/public${url.pathname}`);
  }
};