// Add this `colors.extend` block into your existing tailwind.config.js
// so classes like bg-navy-900, bg-coral-500, bg-cream-50 resolve correctly.
// stone, amber, teal are already built into Tailwind — no changes needed for those.

module.exports = {
    theme: {
        extend: {
            colors: {
                navy: {
                    900: "#0f1a2b",
                },
                coral: {
                    200: "#F5C4B3",
                    500: "#D85A30",
                    900: "#712B13",
                },
                cream: {
                    50: "#FBF8F1",
                },
            },
        },
    },
};