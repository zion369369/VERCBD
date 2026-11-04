# Branch directory import

Source: user-provided tab-separated branch list, imported 5 November 2026.

- 139 parsed rows; two blank rows excluded.
- 137 office records: 136 Branch Offices, one Head Office, 25 districts.
- All 137 supplied coordinate pairs are numeric and within Bangladesh's broad geographic bounds. Branch coordinates remain as supplied; they have not all been independently verified.
- The Head Office pin was checked against its Google Maps listing on 5 November 2026 and corrected from `23.83725,90.260623` to `23.8372313,90.2600408`. Its verified Place ID is `ChIJ8TRi_MrrVTcRqrVIF6eDKms`. Directions now resolve to VERC at B, 30 Ekhlas Uddin Khan Rd, rather than the neighbouring electronics business. This update preserves other CMS edits.
- Branch codes remain strings, including leading zeroes. The head office has its own stable ID because its code `1` and Savar's `0001` must not collide.
- Names, district spellings and postal details are retained, with whitespace/newlines cleaned.
- Mobile numbers for Savar, Fordnagar, Puthia and Talebpur were missing their initial zero; only that formatting was restored. `sourcePhone` preserves every original supplied number.
- Head Office's `0171164703` is incomplete. It stays unchanged in the data and is flagged in admin; public calling falls back to Site Settings until corrected.
- No manager names or branch email addresses were invented.

The versioned directory import replaces the five earlier sample offices once, preserves additional custom offices, and subsequently respects CMS edits and deletions. The source is `frontend/lib/data/branch-directory.json`; ordinary updates belong in Admin > Branch directory.

The office finder uses fresh browser geolocation on request. Straight-line distances identify up to eight nearby candidates. Google Routes compares their driving distances and calculates a route to the selected office. Location lookup retains the selected destination. A separate, explicit action selects another nearby office. Coordinates are sent to Google for calculations and are not written to CMS storage.

The map, route API, Google Maps search link and external directions use the same office coordinates, or its verified Google Place ID. Unverified name searches are avoided: Google can return a different branch, Head Office or an unrelated business. Admin > Branch directory supports coordinates and a verified Google Place ID; updates invalidate routing caches.

A Google Geocoding address audit on 5 November 2026 covered all 137 offices. All returned results, but 127 had only partial matches. These are not verified branch listings. No branch pins were automatically overwritten. See [audit report](branch-map-audit.md) and its CSV for office-by-office review. Public office details identify unverified directory pins.

Search accepts words in any order, small spelling errors, district aliases, Bengali digits and branch codes without leading zeroes. Exact matches rank above approximate matches. Maps use Google Maps JavaScript; driving distance and traffic-aware duration use Google Routes. See [Google integration](google-maps-integration.md).
