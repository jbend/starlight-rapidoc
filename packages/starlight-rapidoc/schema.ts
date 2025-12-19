import { z } from "astro:content";

export const rapidocSchema = z.object({
	specFile: z.string().optional(),
	serverUrl: z.string().optional(),
	allowTry: z.boolean().default(true),
	allowSpecDownload: z.boolean().default(true),
	allowServerSelection: z.boolean().default(false),
});
