/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const flowbite = require("flowbite-react/tailwind");


export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                "beige-500": "#98908B",
                "beige-100": "#F8F4F0",
                "grey-900": "#201F24",
                "grey-500": "#696868",
                "grey-300": "#B3B3B3",
                "grey-100": "#F2F2F2",
                "green": "#277C78",
                "yellow": "#F2CDAC",
                "cayan": "#82C9D7",
                "navy": "#626070",
                "red": "#c94736",
                "purple-dark": "#826CB0",
                "purple": "#AF81BA",
                "turquoise": "#597C7C",
                "brown": "#93674F",
                "magenta": "#934F6F",
                "blue": "#3F82B2",
                "navy-grey": "#97A0AC",
                "army-green": "#7F9161",
                "gold": "#CAB361",
                "orange": "#BE6C49"
            },
            fontFamily: {
                "sans": ["\"Public Sans\"", ...defaultTheme.fontFamily.sans]
            },
            transitionProperty: {
                "height": "height"
            }
        }
    },
    plugins: [
        require("flowbite/plugin")({
            charts: true
        }),
        require("tailwind-scrollbar")
    ]
};

