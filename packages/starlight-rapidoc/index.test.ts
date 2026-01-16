import { beforeEach, describe, expect, it, vi } from "vitest";
import starlightRapidocPlugin from "./index";
import type { StarlightRapidocConfig } from "./libs/config";

describe("starlightRapidocPlugin", () => {
	describe("plugin initialization", () => {
		it("should return a plugin object with correct name", () => {
			const plugin = starlightRapidocPlugin();
			expect(plugin).toBeDefined();
			expect(plugin.name).toBe("starlight-rapidoc");
		});

		it("should have hooks defined", () => {
			const plugin = starlightRapidocPlugin();
			expect(plugin.hooks).toBeDefined();
			expect(plugin.hooks["config:setup"]).toBeDefined();
		});
	});

	describe("config:setup hook", () => {
		let mockUpdateConfig: ReturnType<typeof vi.fn>;
		let mockLogger: {
			info: ReturnType<typeof vi.fn>;
			error: ReturnType<typeof vi.fn>;
		};
		let mockAddIntegration: ReturnType<typeof vi.fn>;
		let mockConfig: { components: Record<string, string> };

		beforeEach(() => {
			mockUpdateConfig = vi.fn();
			mockLogger = {
				info: vi.fn(),
				error: vi.fn(),
			};
			mockAddIntegration = vi.fn();
			mockConfig = {
				components: {},
			};
		});

		it("should handle valid configuration", async () => {
			const config: StarlightRapidocConfig = {
				hexColorBgLight: "#FFFFFF",
				hexColorBgDark: "#000000",
			};

			const plugin = starlightRapidocPlugin(config);
			const hook = plugin.hooks["config:setup"];

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: mockAddIntegration,
					config: mockConfig,
				} as any);

				expect(mockLogger.error).not.toHaveBeenCalled();
				expect(mockUpdateConfig).toHaveBeenCalled();
				expect(mockAddIntegration).toHaveBeenCalled();
			}
		});

		it("should handle empty configuration", async () => {
			const plugin = starlightRapidocPlugin();
			const hook = plugin.hooks["config:setup"];

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: mockAddIntegration,
					config: mockConfig,
				} as any);

				expect(mockLogger.error).not.toHaveBeenCalled();
				expect(mockUpdateConfig).toHaveBeenCalled();
			}
		});

		it("should apply default values when config is empty", async () => {
			const plugin = starlightRapidocPlugin();
			const hook = plugin.hooks["config:setup"];

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: mockAddIntegration,
					config: mockConfig,
				} as any);

				expect(mockUpdateConfig).toHaveBeenCalledWith(
					expect.objectContaining({
						components: expect.objectContaining({
							TwoColumnContent: expect.any(String),
						}),
					}),
				);
			}
		});

		it("should log configuration values", async () => {
			const config: StarlightRapidocConfig = {
				hexColorBgLight: "#FFFFFF",
				hexColorBgDark: "#000000",
				hexColorFgLight: "#333333",
				hexColorFgDark: "#CCCCCC",
			};

			const plugin = starlightRapidocPlugin(config);
			const hook = plugin.hooks["config:setup"];

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: mockAddIntegration,
					config: mockConfig,
				} as any);

				expect(mockLogger.info).toHaveBeenCalledWith(
					expect.stringContaining("[starlight-rapidoc] Config loaded:"),
				);
			}
		});

		it("should handle invalid configuration and log error", async () => {
			const invalidConfig = {
				hexColorBgLight: "invalid-color", // Invalid hex color
			};

			const plugin = starlightRapidocPlugin(invalidConfig as any);
			const hook = plugin.hooks["config:setup"];

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: mockAddIntegration,
					config: mockConfig,
				} as any);

				expect(mockLogger.error).toHaveBeenCalled();
				expect(mockLogger.error).toHaveBeenCalledWith(
					expect.stringContaining("Must be a valid hex color"),
				);
				expect(mockUpdateConfig).not.toHaveBeenCalled();
				expect(mockAddIntegration).not.toHaveBeenCalled();
			}
		});

		it("should call integration hook with vite plugin", async () => {
			const config: StarlightRapidocConfig = {
				hexColorBgLight: "#FFFFFF",
				hexColorBgDark: "#000000",
			};

			const plugin = starlightRapidocPlugin(config);
			const hook = plugin.hooks["config:setup"];

			let integrationHookCalled = false;
			let viteUpdateConfigCalled = false;

			if (hook) {
				await hook({
					updateConfig: mockUpdateConfig,
					logger: mockLogger,
					addIntegration: (integration: any) => {
						integrationHookCalled = true;
						// Simulate calling the integration hook
						if (integration.hooks?.["astro:config:setup"]) {
							integration.hooks["astro:config:setup"]({
								updateConfig: () => {
									viteUpdateConfigCalled = true;
								},
							} as any);
						}
					},
					config: mockConfig,
				} as any);

				expect(integrationHookCalled).toBe(true);
				expect(viteUpdateConfigCalled).toBe(true);
			}
		});
	});
});
