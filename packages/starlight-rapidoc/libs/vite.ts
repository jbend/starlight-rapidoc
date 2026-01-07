import type { ViteUserConfig } from "astro";

import type { ResolvedStarlightRapidocConfig } from "./config";

export function vitePluginStarlightRapidoc(
	config: ResolvedStarlightRapidocConfig,
): VitePlugin {
	const moduleId = "virtual:starlight-rapidoc-config";
	const resolvedModuleId = `\0${moduleId}`;
	const moduleContent = `export default ${JSON.stringify(config)}`;

	return {
		name: "vite-plugin-starlight-rapidoc",
		load(id) {
			return id === resolvedModuleId ? moduleContent : undefined;
		},
		resolveId(id) {
			return id === moduleId ? resolvedModuleId : undefined;
		},
	};
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
