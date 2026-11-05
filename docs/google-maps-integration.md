# Google Maps integration

Google Maps supplies traffic-aware driving routes, road-distance comparisons and reverse geocoding. The Node.js endpoint `/api/location` uses `GOOGLE_MAPS_API_KEY`; its normalized responses do not contain that server credential. Groq and the Hellotek assistant remain integrated separately.

The branch map uses Maps JavaScript API when a separate `GOOGLE_MAPS_BROWSER_KEY` is configured, restricted to approved HTTP referrers and Maps JavaScript API. If that browser key is missing or Google Maps cannot load, the map falls back to OpenStreetMap tiles and retains the office pins and map interactions. `/api/location` serves only the browser key; it never falls back to `GOOGLE_MAPS_API_KEY`. Keep the server key in `GOOGLE_MAPS_API_KEY`, restricted to Routes API and Geocoding API plus outgoing IPs where applicable. Both keys belong in ignored environment configuration, not source files.

For automated cPanel deployment, store the browser key as the GitHub Actions repository secret `GOOGLE_MAPS_BROWSER_KEY`; the workflow places it in the runtime-only `runtime-config.json` file, which `website/server.js` loads before starting Next.js. Apache denies direct requests for this file. For manual cPanel setup, add `GOOGLE_MAPS_BROWSER_KEY` in the Node.js application's environment variables. Do not commit the runtime file or put the browser key in build-time `NEXT_PUBLIC_*` settings.

Routing resolves each requested office ID against the directory. Verified Google Place IDs are used when present; other offices use their own stored coordinates. Neither the routing endpoint nor the external directions link falls back to Head Office for an unknown branch. Location refresh preserves the selected destination. Google cannot correct an inaccurate directory pin automatically; confirm individual pins through Admin > Branch directory.

Live checks returned 17,436 metres to Head Office from the screenshot's starting point, with a traffic-aware estimate around 33 minutes at test time. Nearby offices have separate results. Maps JavaScript rendering, Routes API, route matrix and Geocoding API were checked with the supplied configuration.
