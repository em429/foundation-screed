let colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
		primary: colors.lime,
		secondary: colors.stone,
                neutral: colors.stone,
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
