import { prisma } from "@repo/db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {
        // upgrade the request to a WevSocket
        if(server.upgrade(req)) return;
        return new Response("Upgrade failed", { status: 500 })
    },
    websocket: {
        message(ws, message) {
            prisma.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message)
        },
    },
})