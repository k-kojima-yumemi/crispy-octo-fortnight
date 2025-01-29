import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const serverEntry = process.env.VITE_SERVER_ENTRY ?? "./app/server.ts";

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
            ssr: serverEntry,
            rollupOptions: {
                output: {
                    entryFileNames: "entrypoint.mjs",
                },
            }
        },
        plugins: [honox({})],
    };
});
