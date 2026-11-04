# Google Maps integration

Google Maps now supplies the map, traffic-aware driving routes, road-distance comparisons and reverse geocoding. The Node.js endpoint `/api/location` uses `GOOGLE_MAPS_API_KEY`; its normalized responses do not contain that server credential. Groq and the Hellotek assistant remain integrated separately.

The browser map uses Maps JavaScript API. Its key is visible to browsers by design: configure a separate `GOOGLE_MAPS_BROWSER_KEY` restricted to approved HTTP referrers and Maps JavaScript API for deployment. Locally it uses the supplied Maps key when no separate browser key is set. Keep the server key restricted to the required server APIs and outgoing IPs where applicable. Keys remain in ignored environment configuration, not source files.

Routing resolves each requested office ID against the directory. Verified Google Place IDs are used when present; other offices use their own stored coordinates. Neither the routing endpoint nor the external directions link falls back to Head Office for an unknown branch. Location refresh preserves the selected destination. Google cannot correct an inaccurate directory pin automatically; confirm individual pins through Admin > Branch directory.

Live checks returned 17,436 metres to Head Office from the screenshot's starting point, with a traffic-aware estimate around 33 minutes at test time. Nearby offices have separate results. Maps JavaScript rendering, Routes API, route matrix and Geocoding API were checked with the supplied configuration.
