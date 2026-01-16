import { describe, expect, it } from "vitest";
import { rapidocSchema } from "./schema";

describe("rapidocSchema", () => {
	describe("valid configurations", () => {
		it("should accept all optional fields", () => {
			const config = {
				specFile: "https://example.com/openapi.yaml",
				serverUrl: "https://api.example.com",
				allowTry: true,
				allowSpecDownload: true,
				allowServerSelection: true,
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(config);
			}
		});

		it("should accept empty configuration", () => {
			const result = rapidocSchema.safeParse({});
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.allowTry).toBe(true);
				expect(result.data.allowSpecDownload).toBe(true);
				expect(result.data.allowServerSelection).toBe(false);
			}
		});

		it("should apply default values for boolean fields", () => {
			const result = rapidocSchema.safeParse({
				specFile: "https://example.com/openapi.yaml",
			});
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.allowTry).toBe(true);
				expect(result.data.allowSpecDownload).toBe(true);
				expect(result.data.allowServerSelection).toBe(false);
			}
		});

		it("should accept only specFile", () => {
			const config = {
				specFile: "https://example.com/openapi.yaml",
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.specFile).toBe(config.specFile);
			}
		});

		it("should accept only serverUrl", () => {
			const config = {
				serverUrl: "https://api.example.com",
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.serverUrl).toBe(config.serverUrl);
			}
		});

		it("should accept custom boolean values", () => {
			const config = {
				allowTry: false,
				allowSpecDownload: false,
				allowServerSelection: true,
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.allowTry).toBe(false);
				expect(result.data.allowSpecDownload).toBe(false);
				expect(result.data.allowServerSelection).toBe(true);
			}
		});
	});

	describe("invalid configurations", () => {
		it("should reject non-string specFile", () => {
			const config = {
				specFile: 123,
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject non-string serverUrl", () => {
			const config = {
				serverUrl: 123,
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject non-boolean allowTry", () => {
			const config = {
				allowTry: "true",
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject non-boolean allowSpecDownload", () => {
			const config = {
				allowSpecDownload: "true",
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(false);
		});

		it("should reject non-boolean allowServerSelection", () => {
			const config = {
				allowServerSelection: "true",
			};

			const result = rapidocSchema.safeParse(config);
			expect(result.success).toBe(false);
		});
	});
});
