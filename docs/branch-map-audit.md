# Branch map audit — 5 November 2026

All 137 directory addresses were checked through Google Geocoding. 137 returned results; 127 returned only partial matches. 86 first results differ from the supplied pin by more than 500 metres. An address result, even without the partial-match flag, does not establish the identity or entrance of a VERC office.

Google Places Text Search is blocked for the configured key (HTTP 403). Only Head Office has a previously verified office Place ID. No pins were changed to these ambiguous geocoding results. In particular, Hemaietpur address searches can resolve a location in Kalma instead; named VERC searches can resolve Head Office.

[Office-by-office audit](branch-map-audit.csv) contains supplied addresses, pins, geocoding confidence, discrepancies and Google pin links. Review unverified locations with office staff and save confirmed coordinates/Place IDs in Admin > Branch directory. This is an audit of address consistency, not certification of all 137 office entrances.

The application now uses the same destination for the map marker, internal driving route and both external Google links. Unverified branches use their own coordinates, not a name search that can resolve to Savar. Head Office uses its verified Place ID.
