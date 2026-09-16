# Jarvis Cockpit

Live demo: https://jarvis-cockpit-theta.vercel.app/?demo=1

3D map of your life clusters with a live Vedic timing layer. Fork it, edit clusters.json (or connect Notion), deploy. Static site, no build step.

## Deploy (once)
1. Upload this folder to a new GitHub repo (github.com/new, then "uploading an existing file").
2. In Vercel: Add New Project, import the repo, framework "Other", deploy. Done.

## Record mode
Long-press the title: HUD hides and a slow orbit runs for Reels/TikTok. Long-press anywhere to exit.

## Update (any time)
Edit `clusters.json` on GitHub (pencil icon works from the phone). Vercel redeploys in about 20 seconds and the cockpit reflects it.

Shape of `clusters.json`:
```json
[{ "name": "Career", "kind": "earns", "threads": ["Thread one", "Thread two"] }]
```
`kind` is one of `earns` (teal), `soul` (pink), `admin` (grey).

## Day-lord rule
Sun Founder, Mon Family, Tue Career, Wed Products, Thu Wealth, Fri Content, Sat Spirituality. Edit `DAY_CLUSTER` in `index.html` to remap.

## Install as an app (PWA)
iPhone: open the site in Safari, Share, "Add to Home Screen". Android: Chrome menu, "Install app". Works offline, opens full screen.

## Live auto-update from Notion (no scheduler needed)
1. Create a Notion database "Jarvis Threads" with columns: Name (title), Cluster (select), Kind (select: earns / soul / admin), Status (select: active / parked / shipped).
2. notion.so/my-integrations: new internal integration, copy the secret. Share the database with that integration (database ... menu, Connections).
3. In Vercel project Settings > Environment Variables add NOTION_TOKEN and NOTION_DB (the 32-char id from the database URL). Redeploy once.
The cockpit now reads /api/clusters, cached 5 minutes. Edit Notion, the map follows. If Notion is unreachable it falls back to clusters.json.
