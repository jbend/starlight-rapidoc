import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { rapidocSchema } from "starlight-rapidoc/schema"; // Your plugin export

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: rapidocSchema,
		}),
	}),
};
