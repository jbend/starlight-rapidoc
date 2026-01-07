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

				// Apply default values for null/undefined config values


				const resolvedConfig = {
					hexColorBgLight: starlightRapidocConfig.data?.hexColorBgLight ?? "#F9FAFB",//"#f1f1f6",
					hexColorBgDark: starlightRapidocConfig.data?.hexColorBgDark ?? "#111827",//"#252a2e",
					hexColorFgLight: starlightRapidocConfig.data?.hexColorFgLight ?? "#1F2937",//"#171c1e",
					hexColorFgDark: starlightRapidocConfig.data?.hexColorFgDark ?? "#F3F4F6",//"#f1f1f6",
				};

				logger.info(`[starlight-rapidoc] Config loaded:`);
				logger.info(`  hexColorBgLight: ${resolvedConfig.hexColorBgLight}`);
				logger.info(`  hexColorBgDark: ${resolvedConfig.hexColorBgDark}`);
				logger.info(`  hexColorFgLight: ${resolvedConfig.hexColorFgLight}`);
				logger.info(`  hexColorFgDark: ${resolvedConfig.hexColorFgDark}`);
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
										vitePluginStarlightRapidoc(resolvedConfig),
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
