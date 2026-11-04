# Photo collection

The public gallery and Contact Us photo rail use the same CMS `gallery` collection. Admin > Gallery can upload, edit, categorize and delete every entry.

`frontend/lib/data/photo-library.json` catalogs 24 photographs, covering the 32 original project image files after byte-identical files are grouped. Partner logos are excluded. The bank agreement photograph replaces the generic planning-meeting picture at the user's request; the old asset remains available elsewhere on the site. The replacement is the supplied 856 × 358 JPEG, stored locally as `southeast-bank-verc-agreement.jpg`, with the user's title. Its wide composition is shown in full.

The versioned import in `frontend/lib/photoLibrary.ts` replaces only unchanged sample captions, removes the nonexistent `health_hero.png` sample, adds the missing project photos and preserves custom uploads and edited captions. Once imported, CMS deletions are respected. No dates or unverified event claims are assigned to the imported scenes.

Thumbnails use responsive image sizing and lazy loading. Small source images are contained instead of stretched across a cropped frame. Missing uploads show an explicit unavailable state. The full-image viewer preserves aspect ratio, supports previous/next arrows and Escape, traps focus through a native dialog and returns focus to the selected photograph.

Local checks cover asset availability, catalog import, search/filter/empty states, the bank replacement and caption, keyboard navigation, focus restoration, admin controls and widths from 320 to 1440 pixels.
