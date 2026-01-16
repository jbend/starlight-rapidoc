import { describe, expect, it } from "vitest";
import type { ResolvedStarlightRapidocConfig } from "./config";
import { vitePluginStarlightRapidoc } from "./vite";

describe("vitePluginStarlightRapidoc", () => {
	const mockConfig: ResolvedStarlightRapidocConfig = {
		hexColorBgLight: "#FFFFFF",
		hexColorBgDark: "#000000",
		hexColorFgLight: "#333333",
		hexColorFgDark: "#CCCCCC",
	};

	it("should return a plugin with correct name", () => {
		const plugin = vitePluginStarlightRapidoc(mockConfig);
		expect(plugin.name).toBe("vite-plugin-starlight-rapidoc");
	});

	it("should resolve the virtual module ID", () => {
		const plugin = vitePluginStarlightRapidoc(mockConfig);
		const moduleId = "virtual:starlight-rapidoc-config";
		const resolvedId = plugin.resolveId?.(moduleId);
		expect(resolvedId).toBe(`\0${moduleId}`);
	});

	it("should return undefined for non-matching module IDs in resolveId", () => {
		const plugin = vitePluginStarlightRapidoc(mockConfig);
		const resolvedId = plugin.resolveId?.("other-module");
		expect(resolvedId).toBeUndefined();
	});

	it("should load the resolved module with correct content", () => {
		const plugin = vitePluginStarlightRapidoc(mockConfig);
		const moduleId = "virtual:starlight-rapidoc-config";
		const resolvedId = plugin.resolveId?.(moduleId);
		const content = plugin.load?.(resolvedId!);
		expect(content).toBeDefined();
		expect(content).toContain("export default");
		expect(content).toContain(JSON.stringify(mockConfig));
	});

	it("should return undefined for non-matching module IDs in load", () => {
		const plugin = vitePluginStarlightRapidoc(mockConfig);
		const content = plugin.load?.("other-module");
		expect(content).toBeUndefined();
	});

	it("should handle different config values", () => {
		const differentConfig: ResolvedStarlightRapidocConfig = {
			hexColorBgLight: "#F9FAFB",
			hexColorBgDark: "#111827",
			hexColorFgLight: "#1F2937",
			hexColorFgDark: "#F3F4F6",
		};
		const plugin = vitePluginStarlightRapidoc(differentConfig);
		const moduleId = "virtual:starlight-rapidoc-config";
		const resolvedId = plugin.resolveId?.(moduleId);
		const content = plugin.load?.(resolvedId!);
		expect(content).toContain(JSON.stringify(differentConfig));
	});
});
