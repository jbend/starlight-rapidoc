import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["**/mocks/**", "**/*.test.ts", "**/*.config.ts"],
		},
	},
	resolve: {
		alias: {
			"astro:content": new URL("./mocks/astro-content.ts", import.meta.url)
				.pathname,
		},
	},
});
