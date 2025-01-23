import { file, serve } from "bun";

const PORT = 3000;


async function readData() {
    const logFile = file("log.json");
    const content = await logFile.json();
    return content;
}

serve({
    port: PORT,
    fetch: async (req) => {
        const url = new URL(req.url);
        if (req.method === "GET" && url.pathname === "/users") {
            const data = await readData();
            const url = new URL(req.url);
            const page = parseInt(url.searchParams.get("page") || "1", 10);
            const limit = parseInt(url.searchParams.get("limit") || "10", 10);

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedData = data.slice(startIndex, endIndex);
            const response = JSON.stringify({
                page,
                limit,
                total: data.length,
                data: paginatedData
            });
            return new Response(response, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response("Method Not Allowed", { status: 405 });
    },
});

console.log(`Server is running on http://localhost:${PORT}`);
