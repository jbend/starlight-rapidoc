/**
 * Generates a URL by combining a base path and href, normalizing both.
 * If href is a full URL (starts with http:// or https://), returns it unchanged.
 * Otherwise, combines basePath with href for local file paths.
 * Handles undefined values by defaulting to empty strings.
 *
 * @param basePath - The base path (e.g., "/docs" or undefined)
 * @param href - The href path (e.g., "/api/openapi.yaml" or "https://example.com/api.yaml" or undefined)
 * @returns A normalized URL combining basePath and href, or the original href if it's a full URL
 */
export function generateUrl(
	basePath: string | undefined,
	href: string | undefined,
): string {
	// If href is undefined or empty, return normalized base path with trailing slash
	if (!href) {
		const normalizedBase = (basePath || "").replace(/\/$/, "");
		return normalizedBase ? `${normalizedBase}/` : "/";
	}

	// If href is a full URL (http:// or https://), return it unchanged
	if (/^https?:\/\//i.test(href)) {
		return href;
	}

	// For local file paths, combine with basePath
	const normalizedBase = (basePath || "").replace(/\/$/, "");
	const normalizedHref = href.replace(/^\//, "");
	return `${normalizedBase}/${normalizedHref}`;
}
