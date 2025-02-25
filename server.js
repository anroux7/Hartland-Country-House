export default {
  async fetch(request) {
    let url = new URL(request.url);
    
    // Serve static files from the "public" directory
    if (url.pathname === "/") {
      return new Response(await fetch("https://hartlandcountryhouse.co.za/public/index.html"));
    }

    // Default response
    return new Response("404 Not Found", { status: 404 });
  }
};
