# Jarvis Cockpit

3D map of Shama's life clusters with a live Vedic timing layer. Static site, no build step.

## Deploy (once)
1. Upload this folder to a new GitHub repo (github.com/new, then "uploading an existing file").
2. In Vercel: Add New Project, import the repo, framework "Other", deploy. Done.

## Record mode
Long-press the title: HUD hides and a slow orbit runs for Reels/TikTok. Long-press anywhere to exit.

## Update (any time)
Edit `clusters.json` on GitHub (pencil icon works from the phone). Vercel redeploys in about 20 seconds and the cockpit reflects it.

Shape of `clusters.json`:
```json
[{ "name": "Career", "kind": "earns", "threads": ["Telia", "Curamando"] }]
```
`kind` is one of `earns` (teal), `soul` (pink), `admin` (grey).

## Day-lord rule
Sun Founder, Mon Family, Tue Career, Wed Products, Thu Wealth, Fri Content, Sat Spirituality. Edit `DAY_CLUSTER` in `index.html` to remap.
