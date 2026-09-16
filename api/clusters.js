// GET /api/clusters
// Reads a Notion database (one row per thread) and returns the clusters array the cockpit expects.
// Env vars in Vercel: NOTION_TOKEN (integration secret), NOTION_DB (database id).
// Notion columns: Name (title), Cluster (select), Kind (select: earns | soul | admin), Status (select: active | parked | shipped)
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  const token = process.env.NOTION_TOKEN, db = process.env.NOTION_DB;
  if (!token || !db) return sendFile(res);
  try {
    let results = [], cursor;
    do {
      const r = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
        body: JSON.stringify(cursor ? { start_cursor: cursor, page_size: 100 } : { page_size: 100 })
      });
      if (!r.ok) throw new Error('Notion ' + r.status);
      const j = await r.json();
      results = results.concat(j.results); cursor = j.has_more ? j.next_cursor : null;
    } while (cursor);

    const map = new Map();
    for (const p of results) {
      const pr = p.properties || {};
      const name = (pr.Name?.title || []).map(t => t.plain_text).join('').trim();
      const cluster = pr.Cluster?.select?.name?.trim();
      const kind = (pr.Kind?.select?.name || 'admin').toLowerCase();
      const status = (pr.Status?.select?.name || 'active').toLowerCase();
      if (!name || !cluster || status === 'shipped') continue;
      if (!map.has(cluster)) map.set(cluster, { name: cluster, kind: ['earns','soul','admin'].includes(kind) ? kind : 'admin', threads: [] });
      map.get(cluster).threads.push(status === 'parked' ? name + ' (parked)' : name);
    }
    const out = [...map.values()].sort((a, b) => b.threads.length - a.threads.length);
    if (!out.length) return sendFile(res);
    res.status(200).json(out);
  } catch (e) {
    res.setHeader('X-Fallback', String(e.message));
    sendFile(res);
  }
};

function sendFile(res) {
  try { res.status(200).send(fs.readFileSync(path.join(process.cwd(), 'clusters.json'), 'utf8')); }
  catch { res.status(200).json([]); }
}
