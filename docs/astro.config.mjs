// @ts-check

import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightRapidocPlugin from "../packages/starlight-rapidoc";
import { loadEnv } from "vite";

const { BASE_PATH } = loadEnv(process.env.BASE_PATH || '/', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	site: "https://github.com/jbend/starlight-rapidoc",
	base: BASE_PATH,
	integrations: [
		starlight({
			title: "Starlight Rapidoc",
			plugins: [
				starlightRapidocPlugin({
					hexColorBgLight: "#f1f1f6",
					hexColorFgLight: "#171c1e",
					hexColorBgDark: "#252a2e",
					hexColorFgDark: "#f1f1f6",
				}),
			],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/jbend/starlight-rapidoc",
				},
			],
			sidebar: [
				{
					label: "Start Here",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Overview", slug: "start-here/overview" },
						{ label: "Getting Started", slug: "start-here/getting-started" },
					],
				},
				{
					label: "Demo",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "OpenAPI", slug: "demo/openapi" },
					],
				},
			],
		}),
		mdx(),
	],
});
