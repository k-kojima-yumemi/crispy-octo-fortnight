import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    if (mode === "client") {
        return {
            plugins: [
                client({
                    input: ["./app/style.css"],
                }),
            ],
        };
    }

    return {
        build: {
            emptyOutDir: false,
            ssr: true,
            rollupOptions: {
                input: "./app/server.ts",
            },
        },
        plugins: [honox({})],
    };
});
