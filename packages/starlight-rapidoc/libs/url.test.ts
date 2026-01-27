import { describe, expect, it } from "vitest";
import { generateUrl } from "./url";

describe("generateUrl", () => {
	describe("normal cases", () => {
		it("should combine basePath and href correctly", () => {
			expect(generateUrl("/docs", "/api/openapi.yaml")).toBe(
				"/docs/api/openapi.yaml",
			);
		});

		it("should remove trailing slash from basePath", () => {
			expect(generateUrl("/docs/", "/api/openapi.yaml")).toBe(
				"/docs/api/openapi.yaml",
			);
		});

		it("should remove leading slash from href", () => {
			expect(generateUrl("/docs", "/api/openapi.yaml")).toBe(
				"/docs/api/openapi.yaml",
			);
		});

		it("should handle both trailing and leading slashes", () => {
			expect(generateUrl("/docs/", "/api/openapi.yaml")).toBe(
				"/docs/api/openapi.yaml",
			);
		});

		it("should handle empty basePath", () => {
			expect(generateUrl("", "/api/openapi.yaml")).toBe("/api/openapi.yaml");
		});

		it("should handle empty href", () => {
			expect(generateUrl("/docs", "")).toBe("/docs/");
		});
	});

	describe("undefined handling", () => {
		it("should handle undefined basePath", () => {
			expect(generateUrl(undefined, "/api/openapi.yaml")).toBe(
				"/api/openapi.yaml",
			);
		});

		it("should handle undefined href", () => {
			expect(generateUrl("/docs", undefined)).toBe("/docs/");
		});

		it("should handle both undefined", () => {
			expect(generateUrl(undefined, undefined)).toBe("/");
		});
	});

	describe("full URL handling", () => {
		it("should return https:// URLs unchanged", () => {
			expect(generateUrl("/docs", "https://example.com/api/openapi.yaml")).toBe(
				"https://example.com/api/openapi.yaml",
			);
		});

		it("should return http:// URLs unchanged", () => {
			expect(generateUrl("/docs", "http://example.com/api/openapi.yaml")).toBe(
				"http://example.com/api/openapi.yaml",
			);
		});

		it("should return full URLs unchanged regardless of basePath", () => {
			expect(
				generateUrl("/any/base/path", "https://api.example.com/spec.yaml"),
			).toBe("https://api.example.com/spec.yaml");
		});

		it("should handle full URLs with query parameters", () => {
			expect(
				generateUrl("/docs", "https://example.com/api.yaml?v=1&token=abc"),
			).toBe("https://example.com/api.yaml?v=1&token=abc");
		});

		it("should handle full URLs case-insensitively", () => {
			expect(generateUrl("/docs", "HTTPS://EXAMPLE.COM/api.yaml")).toBe(
				"HTTPS://EXAMPLE.COM/api.yaml",
			);
		});
	});

	describe("edge cases", () => {
		it("should handle basePath with only slash", () => {
			expect(generateUrl("/", "/api/openapi.yaml")).toBe("/api/openapi.yaml");
		});

		it("should handle href with only slash", () => {
			expect(generateUrl("/docs", "/")).toBe("/docs/");
		});

		it("should handle multiple trailing slashes in basePath", () => {
			// Only removes one trailing slash, so "/docs///" becomes "/docs//"
			expect(generateUrl("/docs///", "/api/openapi.yaml")).toBe(
				"/docs///api/openapi.yaml",
			);
		});

		it("should handle multiple leading slashes in href", () => {
			// Only removes one leading slash, so "///api" becomes "//api"
			// Then "/docs" + "/" + "//api" = "/docs///api"
			expect(generateUrl("/docs", "///api/openapi.yaml")).toBe(
				"/docs///api/openapi.yaml",
			);
		});

		it("should handle relative paths without leading slash", () => {
			expect(generateUrl("/docs", "api/openapi.yaml")).toBe(
				"/docs/api/openapi.yaml",
			);
		});

		it("should handle basePath without leading slash", () => {
			expect(generateUrl("docs", "/api/openapi.yaml")).toBe(
				"docs/api/openapi.yaml",
			);
		});
	});
});
