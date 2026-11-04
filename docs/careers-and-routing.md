# Careers and road distances

## Recruitment

The supplied recruitment destination, https://bdjobs.com/h/company-insight/28456, was checked on 5 November 2026 and identifies Village Education Resource Center (VERC). Vacancy counts are not copied into the website because they change on BDJobs.

The public Career page links to that company page. The four seeded vacancies and two identifiable sample applicants are removed by a versioned migration. Genuine custom notices and applications remain in the CMS. New jobs start as blank drafts, with no sample salary, requirements or deadline. An admin notice appears publicly only when Active, unexpired and linked to an HTTPS BDJobs URL. Applications follow the official BDJobs circular, rather than a local CV form. The historical application inbox remains available in admin.

## Routing and accuracy

The map uses Leaflet and OpenStreetMap tiles. Geoapify now supplies road routes, nearby-office comparisons and starting-area reverse geocoding through the server endpoint `/api/location`. API keys stay on the server. See [assistant and Geoapify configuration](assistant-and-geoapify.md) for setup, privacy, request limits and validation.

The earlier nearest-office action silently replaced the selected destination with a closer branch. “Use my location” now supplies only the starting point. The selected destination and its driving distance stay together above the map; choosing a different nearby office is explicit. GPS accuracy and manual starting-point correction remain available. Estimates exclude live traffic.
