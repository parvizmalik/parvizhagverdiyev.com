<?xml version="1.0" encoding="UTF-8"?>
<!-- Makes /rss.xml readable when someone opens it in a browser. Feed readers ignore this. -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>RSS feed · <xsl:value-of select="/rss/channel/title"/></title>
        <style>
          :root { --bg:#fdfcf9; --fg:#1c1b19; --muted:#6b6860; --rule:#e7e3da; --accent:#9a3b1e; --soft:#f4e9e3; }
          @media (prefers-color-scheme: dark) { :root { --bg:#141412; --fg:#e8e5de; --muted:#a29e94; --rule:#2b2a26; --accent:#e3906f; --soft:#2e221c; } }
          body { margin:0; background:var(--bg); color:var(--fg); font:18px/1.6 Georgia, 'Iowan Old Style', serif; }
          main { max-width:40rem; margin:0 auto; padding:3rem 1.25rem 4rem; }
          .sans { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; }
          .note { background:var(--soft); border-radius:10px; padding:1rem 1.2rem; font-size:0.9rem; }
          .note a { color:var(--accent); }
          h1 { font-size:1.9rem; letter-spacing:-0.02em; margin:2rem 0 0.4rem; }
          .desc { color:var(--muted); margin:0 0 2.5rem; }
          a { color:inherit; text-underline-offset:0.18em; }
          ul { list-style:none; padding:0; margin:0; }
          li { padding:1rem 0; border-top:1px solid var(--rule); }
          li a { font-size:1.2rem; text-decoration:none; }
          li a:hover { color:var(--accent); }
          li p { margin:0.3rem 0 0; color:var(--muted); font-size:1rem; }
          li small { color:var(--muted); font-size:0.75rem; }
        </style>
      </head>
      <body>
        <main>
          <p class="note sans">
            <strong>This is an RSS feed.</strong> Feed-reader apps use this page to show you new posts automatically.
            <a href="/subscribe/">See how to subscribe</a> or <a href="/">go to the website</a>.
          </p>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
          <ul>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <small class="sans"><xsl:value-of select="substring(pubDate, 6, 11)"/></small><br/>
                <a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a>
                <p><xsl:value-of select="description"/></p>
              </li>
            </xsl:for-each>
          </ul>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
