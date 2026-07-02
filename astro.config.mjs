import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
	site: "https://angellontiveros.github.io",
	integrations: [tailwind()],
});
