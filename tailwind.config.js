/** @type {import('tailwindcss').Config} */
export default {
    prefix: 't-', // add your prefix here
    important: true,
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}