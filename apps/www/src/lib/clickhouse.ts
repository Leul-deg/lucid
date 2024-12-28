import { createClient } from "@clickhouse/client";
import { env } from "env.mjs";

export const client = createClient({
    host: env.CLICKHOUSE_HOST,
    password: env.CLICKHOUSE_PASSWORD,
    username: env.CLICKHOUSE_USER,
    database: env.CLICKHOUSE_DATABASE,
});

export const getIsWebsiteActive = async ({ websiteId }: { websiteId: string }) =>
    await client
        .query({
            query: `select id from lucid.event where websiteId = '${websiteId}' limit 1`,
            format: "JSONEachRow",
        })
        .then(async (res) => (await res.json()) as { id: string }[]);

export const removeWebsiteData = async ({ websiteId }: { websiteId: string }) => {
    const res = await client.query({
        query: `ALTER TABLE lucid.event DELETE WHERE websiteId = '${websiteId}'`
    })
    console.log(res)
    return res
}