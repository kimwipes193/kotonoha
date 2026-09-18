export default {
  async fetch(request, env) {
    // Keep URL, cookies, streaming bodies and Origin intact for OAuth and CSRF.
    // Preview hosts must not acquire authenticated production sessions.
    if (new URL(request.url).hostname !== 'kotonoha-post.pages.dev') {
      return new Response('Please visit https://kotonoha-post.pages.dev/', {status: 404});
    }
    return env.APP.fetch(request);
  },
};
