const tailwindcss = require('tailwindcss')
const postcssImport = require('postcss-easy-import')
const packMedia = require('css-mqpacker')
const simplevariables = require('postcss-simple-vars')
const inlinemedia = require('postcss-inline-media')
const autoprefixer = require('autoprefixer')
const clean = require('postcss-clean')
const unnest = require('postcss-nested')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    unnest,
    autoprefixer,
    postcssImport,
    inlinemedia,
    simplevariables,
    packMedia,
    clean,
  ],
}
