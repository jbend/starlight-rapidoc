import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StarlightPlugin } from "@astrojs/starlight/types";
import type { StarlightRapidocConfig } from "./libs/config";
import { StarlightRapidocConfigSchema } from "./libs/config";
import { vitePluginStarlightRapidoc } from "./libs/vite";

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type { StarlightRapidocConfig } from "./libs/config";

export default function starlightRapidocPlugin(
	userConfig?: StarlightRapidocConfig,
): StarlightPlugin {
	const starlightRapidocConfig =
		StarlightRapidocConfigSchema.safeParse(userConfig);

	// Get absolute path to the component
	const twoColumnContentOverridePath = join(
		__dirname,
		"components",
		"TwoColumnContentOverride.astro",
	);

	return {
		name: "starlight-rapidoc",
		hooks: {
			"config:setup": async ({
				updateConfig,
				logger,
				addIntegration,
				config,
			}) => {
				const parsedSuccess = starlightRapidocConfig.success;
				if (!parsedSuccess) {
					logger.error(`${starlightRapidocConfig.error.message}`);
					return;
				}

				const hexColorBgLight = starlightRapidocConfig.data?.hexColorBgLight;
				const hexColorBgDark = starlightRapidocConfig.data?.hexColorBgDark;
				const hexColorFgLight = starlightRapidocConfig.data?.hexColorFgLight;
				const hexColorFgDark = starlightRapidocConfig.data?.hexColorFgDark;

				logger.info(`Reading hex color bg light: ${hexColorBgLight}`);
				logger.info(`Reading hex color bg dark: ${hexColorBgDark}`);
				logger.info(`Reading hex color fg light: ${hexColorFgLight}`);
				logger.info(`Reading hex color fg dark: ${hexColorFgDark}`);
				updateConfig({
					components: {
						...config.components,
						TwoColumnContent: twoColumnContentOverridePath,
					},
				});

				addIntegration({
					name: "starlight-rapidoc-integration",
					hooks: {
						"astro:config:setup": ({ updateConfig }) => {
							updateConfig({
								vite: {
									plugins: [
										vitePluginStarlightRapidoc(starlightRapidocConfig.data ?? {}),
									],
								},
							});
						},
					},
				});
			},
		},
	};
}
