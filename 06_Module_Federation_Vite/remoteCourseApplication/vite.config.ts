import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "course_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./CourseTable": "./src/Components/CourseTable/CourseTable.tsx",
        "./CourseDetails": "./src/Components/CourseDetails/CourseDetails.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3003,
  },
});
