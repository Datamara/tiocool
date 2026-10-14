import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tiocool.com";

const ROUTES = [
  "",
  "/tecnologia",
  "/cursos",
  "/blog",
  "/historia",
  "/libros",
  "/contacto",
  "/terminos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
