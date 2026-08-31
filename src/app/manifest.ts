import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Project Peak", short_name: "Peak", description: "Knowledge. Habits. Identity.", start_url: "/", display: "standalone", background_color: "#f4f2eb", theme_color: "#06111a", icons: [{ src: "/brand/icon.png", sizes: "512x512", type: "image/png" }] };
}
