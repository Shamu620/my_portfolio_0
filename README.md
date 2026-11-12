# Shalom Mumo | Portfolio Website

My personal portfolio. I'm a first-year Computer Science student at the University of Nairobi and a full-stack developer. I built this responsive, corporate-style site with HTML, CSS and vanilla JavaScript to present my skills, projects and journey.

## Sections

- **Home**: introduction, short bio and links to my GitHub and LinkedIn
- **About**: background, goals and key facts
- **Skills**: languages, backend, frontend, and tools and practice
- **Projects**: selected work from my GitHub, with a category filter
- **Journey**: education and milestones so far
- **Contact**: email details and a contact form

## Features

- Responsive layout for desktop, tablet and mobile
- Light and dark theme toggle that remembers the visitor's choice
- Sticky header with active-section highlighting while scrolling
- Mobile navigation menu
- Project filter (All, Backend, Web design)
- Contact form that opens the visitor's email app with the message filled in
- Back-to-top button
- Minimal motion: only subtle hover transitions, switched off for visitors who prefer reduced motion
- Accessibility basics: skip link, semantic HTML, labelled controls and visible keyboard focus
- Inline SVG favicon, so no extra file is needed

## Built with

- HTML5
- CSS3 (custom properties for theming, Flexbox and Grid)
- Vanilla JavaScript (no frameworks or libraries)
- [IBM Plex Sans and IBM Plex Serif](https://fonts.google.com/) from Google Fonts

## Project structure

The page loads its assets from absolute `/static/...` paths, so the folders should look like this:

```
.
├── landing_page.html
└── static/
    ├── css/
    │   └── landing_page.css
    ├── js/
    │   └── landing_page.js
    └── images/
        ├── official_img.jpg
        ├── shalom_at_canvathon.png
        ├── novact_claims_dashboard.png
        ├── savannah_spoon_inn.png
        └── future_novact_claims_go.png
```

## Running locally

This is a plain HTML, CSS and JavaScript site, so there is nothing to install or build.

1. Clone the repository and open the project folder in VS Code.
2. Install the **Live Server** extension if you don't have it.
3. Right-click `landing_page.html` and choose **Open with Live Server**.

The page loads its files from `/static/...`, so open the folder that contains `landing_page.html` and `static/` as your VS Code workspace root. That way Live Server serves them correctly.

## Customising

- **Contact email:** update the `MY_EMAIL` constant in `static/js/landing_page.js`, which is where the contact form sends messages, and the email links in `landing_page.html`.
- **Images:** replace the files in `static/images/`, keeping the same file names, or update the `src` paths in the HTML.
- **Colours and fonts:** change the CSS variables at the top of `static/css/landing_page.css` (the `:root` block for light mode and `:root[data-theme="dark"]` for dark mode).

## Projects featured

| Project | Description | Code |
|---|---|---|
| Novact Claims portal (EBIL Claims) | Claims management system built with Django, covering Motor, Non-Motor and Credit Life claims. A Go rewrite is planned. | [GitHub](https://github.com/Shamu620/Claims_portal) |
| Savannah Spoon Inn | Responsive hotel website with menu and contact sections, built with HTML and CSS. | [GitHub](https://github.com/Shamu620/Savannah_spoon_inn) |

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari. Some older browsers and Safari may not show the SVG favicon.

## Contact

- GitHub: [github.com/Shamu620](https://github.com/Shamu620/)
- LinkedIn: [linkedin.com/in/shalom-mumo](https://www.linkedin.com/in/shalom-mumo-5810943a2/)
- Email: shalommumo620@students.uonbi.ac.ke

## License

&copy; Shalom Mumo. All rights reserved.