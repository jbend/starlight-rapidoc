import { z } from "zod";

// Regex for validating hex colors
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Define the schema
const hexColorSchema = z
	.string()
	.regex(
		hexColorRegex,
		'Must be a valid hex color string (e.g., "#FFF" or "#FFFFFF")',
	);

export const StarlightRapidocConfigSchema = z.object({
	hexColorBgLight: hexColorSchema,
	hexColorBgDark: hexColorSchema,
	hexColorFgLight: hexColorSchema,
	hexColorFgDark: hexColorSchema,
});

export type StarlightRapidocUserConfig = z.infer<
	typeof StarlightRapidocConfigSchema
>;
export type StarlightRapidocConfig = z.infer<
	typeof StarlightRapidocConfigSchema
>;
