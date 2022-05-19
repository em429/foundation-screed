/** @type {import('@sveltejs/kit').ExternalFetch} */


export async function externalFetch(request) {
  if (import.meta.env.MODE === 'development') {
      return fetch(request)
  } else if (import.meta.env.MODE === 'production') {
      if (request.url.startsWith(process.env["API_BASE_URL"])) {
        // clone the original request, but change the URL
        request = new Request(
          request.url.replace(process.env["API_BASE_URL"], 'http://localhost:3023/'),
          request
        );
      }
      return fetch(request);
  } else {
      return fetch(request)
  }
}
