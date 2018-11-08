# Slalom Fractal Accelerator
This is an accelerator for Fractal (http://fractal.build/), a tool for building design systems.

While Fractal primarily serves as a documentation site out of the box, we've added several tools on top of this to serve as a stand alone design system creator.

Currently this serves as:

* Asset Pipeline
  * Sass Compiler
  * Autoprefixer
  * SVG inliner
* Error notifier via OS-level notifications

More functionality is coming soon.

## Getting Started
Start by creating a copy of this repository.

Start the development server with `npm start`

## Customizing Your Project
There are some variables you will want to configure to meet the needs of your project:

* In `fractal.js` you should set your project title
* Optional - you might want to rename the `src/assets/styles/styles.scss` file to something more unique

## Components
Components are stored in the `src/components` directory. Read the [Fractal components docs](https://fractal.build/guide/components/) to understand more on how to create a component.

## Documentation Pages
Documentation pages are static markdown pages that do not contain the component display template. These markdown pages should be stored in the `src/docs` directory.

Read the [Fractal documentation docs](https://fractal.build/guide/documentation/) to understand how to use the docs pages.

## Styles
Out of the box, we have included an opinionated CSS framework. You should start reading documentation in the `src/assets/styles/styles.scss` file. All CSS should be imported in here.

### Design Tokens
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

You should set/validate the following design tokens:

* Color Palette: `src/assets/styles/tokens/_colors.scss`
* Spacing Scale: `src/assets/styles/tokens/_spacing.scss`
* Type Scale: `src/assets/styles/tokens/_type.scss`

### Layout Styles
You should set your global layout styles in the `src/assets/styles/layouts/` directory.

### Component Styles
Each component you build should have a corresponding Sass file in `src/assets/styles/components/`

## Accelerator To Do List

* Add minified CSS build
* Add SVG icon system build