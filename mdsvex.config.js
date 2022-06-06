import { defineMDSveXConfig as defineConfig } from 'mdsvex'

const mdsvexConfig = defineConfig({
    extensions: ['.svelte.md', '.md', '.svx'],

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [],
    rehypePlugins: [],
})

export default mdsvexConfig
