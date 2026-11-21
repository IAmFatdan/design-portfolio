# Fatdan Graphic Design Portfolio — v6

This is an updated version of the Fatdan website using the artwork provided in `Designs.zip`.

## What's new in v4

Daniel confirmed which 8 named projects are client work; the remaining 2 projects are personal work.

- **Client work (8):** Sui Meets IOTA, 5 Days of Gen AI, Class of ’26 Sign-Out, Dunz Delight, Movie Night, Data Analytics Masterclass, Frango Fries, Grow with AI (two artworks in one project).
- **Personal work (2):** Did You Know? and Happy New Month.
- Every project card now has a clear **Client Work** or **Personal Work** label.
- The project gallery can be filtered by **work type** and **design category**, separately or together.
- Every project detail page shows its confirmed project type.
- The artwork and designer biography remain unchanged.
- Creative briefs, designer responsibilities, named collaborators and outcomes are intentionally **not invented**.

## What's new in v3

- Introduced **Daniel Fatimehin**, his **3 years of experience**, design specialties and philosophy.
- Added branding and visual storytelling to the service section.

## Earlier updates

- Replaced the six fictional projects with **10 projects** organized from **11 distinct pieces of actual artwork**.
- Used one of the designs as a homepage feature.
- Created **case-study pages** that display full artwork and note the visual elements shown, without inventing client outcomes, timelines, project briefs, or unverified credits.
- Kept a consistent minimal and premium style, responsive layouts, category filters, dark mode, and live email/social links.
- Converted the submitted PNGs into high-quality WebP copies for easier viewing. The original supplied files were not modified. The two `showcase` PNGs were pixel-identical; only one is displayed.

## Preview

1. Extract this ZIP.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari.
3. Click any artwork to view its full project page, or select **VIEW FULL IMAGE** to inspect the artwork at full resolution.
4. Try category filters and the sun/moon theme button.

You don't need Node, npm, or a backend to run this website.

## Update the portfolio

- `assets/content.js`: brand, email, social links, About copy and projects.
- `assets/projects/`: 11 web-optimized design images.
- `index.html`: homepage markup and service headings.
- `project.html`: the layout container for the case-study template.
- `assets/styles.css`: colors, spacing, typography and responsive rules.
- `assets/app.js`: filters, project cards, case-study rendering, menu and theme.

For each project in `assets/content.js`, update title and notes if necessary, add new artwork paths to `gallery`, and set `image` to the main artwork path. The design-category filters are **Campaigns**, **Events**, **Promotional**, **Social**. There is an additional independent work-type filter for **All work**, **Client work**, and **Personal work**.

### Information still needed before launch

Work-type classification has been confirmed. Please supply the role you played on each project, relevant client briefs, collaborator credits, and any measurable outcome information if you want fuller case studies. Current project descriptions are visual observations, not claims about the creative process or outcomes.

## Publish on Vercel

1. Put the extracted files in a new GitHub repository (not the ZIP itself).
2. In Vercel, choose **Add New → Project** and import the repository.
3. Choose **Other** as the framework preset and leave the build command empty. The site's root contains `index.html`.
4. Deploy. Updates pushed to the connected GitHub repository will be re-deployed.

You can also use Netlify, GitHub Pages, or any host that supports static HTML.

## Brand information

- Brand: **Fatdan**
- Designer: **Daniel Fatimehin**
- Experience: **3 years**
- Specialties: event flyers, social media graphics, promotional designs, branding, visual storytelling
- Monogram: **FD**
- Email: fatimehindanieloluyemi1@gmail.com
- LinkedIn: https://www.linkedin.com/in/daniel-fatimehin/
- X: https://x.com/jesus_kid01

## Project index

1. Grow with AI (two designs)
2. Frango Fries
3. Data Analytics Masterclass
4. Movie Night
5. Dunz Delight
6. Class of ’26 Sign-Out
7. Did You Know?
8. Sui Meets IOTA
9. Happy New Month
10. 5 Days of Gen AI

**Important:** The user-provided image compositions, logos, details and contact information appearing inside the designs themselves are preserved as-is. They are part of the artwork and not altered by the portfolio's own contact data.

## Version 5 – larger brand in navigation
The header logo and Fatdan wordmark have been enlarged. Change `.brand` and `.brand-mark` in `assets/styles.css` for desktop, and use the `@media (max-width: 520px)` overrides for mobile.

## Version 6 — WhatsApp direct chat (active)

The owner-provided WhatsApp number **0808 594 6570** is configured in `assets/content.js` in international format (`2348085946570`).

- The **Chat directly on WhatsApp** button in the homepage contact section is active, with the phone number displayed beside it.
- A floating WhatsApp shortcut is available on both the homepage and individual project pages.
- Both use `https://wa.me/2348085946570` with a pre-filled design inquiry message.
- The existing email, LinkedIn, and X contact links remain unchanged.
- The earlier FD centering CSS remains included.

To change this number in the future, edit the `whatsapp` value near the top of `assets/content.js`. Use the country code without a plus sign, whitespace, or leading local zero. Refresh the website after saving and test the chat links on a phone with WhatsApp installed.

**Privacy:** This number is published in the site's source and WhatsApp links. Only use a number you are happy to make public.

### WhatsApp visibility fix

The homepage and project pages now contain working WhatsApp links directly in their HTML, without needing JavaScript to reveal them. The number **0808 594 6570** is visibly displayed next to the main contact CTA. When publishing an update, replace all files in the existing repository and redeploy; a hard refresh (`Ctrl + Shift + R`) may be required if a cached older build is showing.
