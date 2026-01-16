import { describe, expect, it } from "vitest";
import { StarlightRapidocConfigSchema } from "./config";

describe("StarlightRapidocConfigSchema", () => {
	describe("valid configurations", () => {
		it("should accept valid hex colors", () => {
			const config = {
				hexColorBgLight: "#FFFFFF",
				hexColorBgDark: "#000000",
				hexColorFgLight: "#333333",
				hexColorFgDark: "#CCCCCC",
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(config);
			}
		});

		it("should accept short hex colors", () => {
			const config = {
				hexColorBgLight: "#FFF",
				hexColorBgDark: "#000",
				hexColorFgLight: "#333",
				hexColorFgDark: "#CCC",
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(config);
			}
		});

		it("should accept lowercase hex colors", () => {
			const config = {
				hexColorBgLight: "#ffffff",
				hexColorBgDark: "#000000",
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(true);
		});

		it("should accept partial configuration", () => {
			const config = {
				hexColorBgLight: "#FFFFFF",
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(true);
		});

		it("should accept empty configuration", () => {
			const result = StarlightRapidocConfigSchema.safeParse({});
			expect(result.success).toBe(true);
		});

		it("should accept null configuration", () => {
			const result = StarlightRapidocConfigSchema.safeParse(null);
			expect(result.success).toBe(true);
		});

		it("should accept undefined configuration", () => {
			const result = StarlightRapidocConfigSchema.safeParse(undefined);
			expect(result.success).toBe(true);
		});

		it("should accept nullable color values", () => {
			const config = {
				hexColorBgLight: null,
				hexColorBgDark: "#000000",
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(true);
		});
	});

	describe("invalid configurations", () => {
		it("should reject invalid hex color format", () => {
			const config = {
				hexColorBgLight: "FFFFFF", // Missing #
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject invalid hex color with wrong length", () => {
			const config = {
				hexColorBgLight: "#FFFF", // Wrong length
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject invalid hex color with non-hex characters", () => {
			const config = {
				hexColorBgLight: "#GGGGGG", // Invalid characters
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject non-string color values", () => {
			const config = {
				hexColorBgLight: 12345,
			};

			const result = StarlightRapidocConfigSchema.safeParse(config);
			expect(result.success).toBe(false);
		});
	});
});
