# Shalom Mumo | Portfolio Website

My personal portfolio. I'm a first-year Computer Science student at the University of Nairobi and a full-stack developer. I built this responsive, multi-page site with HTML, CSS and vanilla JavaScript to present my skills, projects and journey, in a corporate style with a purple theme.

## Pages

| Page | File | What it contains |
|---|---|---|
| **Home** | `index.html` | Introduction and portrait, technology strip, key stats, what I do, featured project, what I'm working on now, contact banner |
| **About** | `about.html` | Background and goals, how I work, skills (languages, backend, frontend, tools and practice), education and journey timeline |
| **Projects** | `projects.html` | Selected work from my GitHub, with an All / Backend / Web design filter |
| **Case study** | `novact_claims.html` | Novact Claims Portal in depth: overview, features, Django vs planned Go edition, architecture, claim types and roadmap |
| **Contact** | `contact.html` | Email, location, GitHub and LinkedIn details, and a contact form |

## Features

- Five linked pages with a shared header, footer and navigation
- Purple, corporate design with IBM Plex typography
- Responsive layout for desktop, tablet and mobile, with a dropdown mobile menu
- Light and dark theme toggle that remembers the visitor's choice
- Scroll progress bar, sticky header and back-to-top button
- Scroll-reveal animations, animated stat counters and a hero spotlight that follows the cursor
- Scrolling technology strip and an animated timeline
- Project filter (All, Backend, Web design)
- Case study with a tabbed comparison of the Django version and the planned Go concept, a sidebar table of contents that tracks the current section, and a simplified architecture diagram
- Contact form that opens Gmail compose with the message filled in
- Accessibility basics: skip link, semantic HTML, labelled controls, visible keyboard focus, and all animation switched off for visitors who prefer reduced motion
- Inline SVG favicon, so no extra file is needed

## Built with

- HTML5
- CSS3 (custom properties for theming, Flexbox and Grid)
- Vanilla JavaScript (no frameworks or libraries)
- [IBM Plex Sans, IBM Plex Serif and IBM Plex Mono](https://fonts.google.com/) from Google Fonts

## Project structure

All pages use relative paths, so the HTML files sit together in the project root with a `static/` folder beside them:

```
.
├── index.html
├── about.html
├── projects.html
├── novact-claims.html
├── contact.html
├── README.md
└── static/
    ├── css/
    │   └── site.css
    ├── js/
    │   └── site.js
    └── images/
        ├── official_img.jpg
        ├── shalom_at_canvathon.png
        ├── novact_claims_dashboard.png
        ├── savannah_spoon_inn.png
        └── future_novact_claims_go.png
```

- `static/css/site.css`: the shared design system (theme variables, layout, components, animations, responsive rules)
- `static/js/site.js`: the shared behavior (theme toggle, menu, scroll effects, reveal animations, filter, tabs, table of contents, contact form)

## Running locally

This is a plain HTML, CSS and JavaScript site, so there is nothing to install or build.

1. Clone the repository and open the project folder in VS Code.
2. Install the **Live Server** extension if you don't have it.
3. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a browser.

## Customising

- **Contact email:** update the `MY_EMAIL` constant in `static/js/site.js`, which is where the contact form sends messages, and the Gmail links in `about.html`, `contact.html` and the footer of every page.
- **Images:** replace the files in `static/images/`, keeping the same file names, or update the `src` paths in the HTML.
- **Colours:** change the CSS variables at the top of `static/css/site.css`. The `:root` block controls light mode and the `[data-theme="dark"]` block controls dark mode. The main purple is `--accent`.
- **Fonts:** change the `--font-sans`, `--font-serif` and `--font-mono` variables, and the Google Fonts link in each page's `<head>`.
- **Navigation:** the header and footer are repeated in each HTML file, so a new page needs a link added to all of them.

## Projects featured

| Project | Description | Links |
|---|---|---|
| Novact Claims Portal | Claims management system built with Django, covering Motor, Non-Motor and Credit Life claims. A Go rewrite is planned. | [Case study](novact-claims.html) · [GitHub](https://github.com/Shamu620/Claims_portal) |
| Savannah Spoon Inn | Responsive hotel and restaurant website with menu and contact sections, built with HTML and CSS. | [GitHub](https://github.com/Shamu620/Savannah_spoon_inn) |
| Novact Claims, Go edition | Planned rewrite in Go for faster request handling. Shown as a concept preview with simulated figures, not measured results. | [Concept](novact-claims.html#compare) |

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari. Some older browsers and Safari may not show the SVG favicon.

## Contact

- GitHub: [github.com/Shamu620](https://github.com/Shamu620/)
- LinkedIn: [linkedin.com/in/shalom-mumo](https://www.linkedin.com/in/shalom-mumo-5810943a2/)
- Email: shalommumo620@students.uonbi.ac.ke

## License

&copy; Shalom Mumo. All rights reserved.