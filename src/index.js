export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/unlock' && request.method === 'POST') {
      const { passkey } = await request.json();
      const entered = (passkey || '').trim().toLowerCase();
      const devKey = (env.SITE_PASSWORD_DEV || '').trim().toLowerCase();
      const prodKey = (env.SITE_PASSWORD_PROD || '').trim().toLowerCase();

      if (entered === devKey) return Response.json({ ok: true, env: 'development' });
      if (entered === prodKey) return Response.json({ ok: true, env: 'production' });
      return Response.json({ ok: false }, { status: 401 });
    }

    return env.ASSETS.fetch(request);
  }
};