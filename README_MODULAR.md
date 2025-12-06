# Portfolio Modular Structure

This project has been restructured to use modular HTML components.

## Structure
- `index.html`: The generated production file (Do not edit directly if using the build system).
- `index.template.html`: The master template containing the layout and include markers.
- `sections/`: Directory containing individual HTML components.
  - `sidebar.html`
  - `hero.html`
  - `about.html`
  - ...etc

## How to make changes
1. Edit the specific file in `sections/` (e.g., `sections/about.html`).
2. Run the build script to regenerate `index.html`.

## Build Script
A Python script `assemble.py` is included to assemble the site.

**Usage:**
```bash
python assemble.py
```
This will read `index.template.html`, replace the `<!-- include: ... -->` comments with the content from `sections/`, and write to `index.html`.
