// @ts-check

import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightRapidocPlugin from "../packages/starlight-rapidoc";

// https://astro.build/config
export default defineConfig({
	site: "https://starlight-rapidoc.github.io",
	base: "/",
	integrations: [
		starlight({
			title: "Plugin Template",
			plugins: [
				starlightRapidocPlugin({
					hexColorBgLight: "#0063a3",
					hexColorBgDark: "#0063a3",
					hexColorFgLight: "#0063a3",
					hexColorFgDark: "#0063a3",
				}),
			],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/jbend/starlight-plugin-template",
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
