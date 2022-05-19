let colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                neutral: colors.slate,
                positive: colors.green,
                urge: colors.violet,
                warning: colors.yellow,
                info: colors.blue,
                critical: colors.red,
            },
        },
    },

    plugins: [require('a17t')],
}
