"use client";
import { columns } from "./column";
import { renderSubComponent } from "./detail-modal";
import { DataTable } from "./table-data";
import { fetcher } from "@/lib/utils";
import { LucidCustomEvent } from "@lucid/types";
import { env } from "env.mjs";
import useSWR from "swr";

const Events = ({
    startDate,
    endDate,
    websiteId,
}: {
    startDate: Date;
    endDate: Date;
    websiteId: string;
}) => {
    console.log(websiteId, "event");
    const url = env.NEXT_PUBLIC_API_URL;
    const { data, isLoading } = useSWR<LucidCustomEvent[]>(
        `${url}/events?websiteId=${websiteId}&startDate=${startDate}&endDate=${endDate}`,
        fetcher,
    );
    if (!isLoading) {
        console.log(data, "event ata");
    }
    return (
        <div className=" no-scrollbar">
            <DataTable
                columns={columns}
                data={data ?? []}
                renderSubComponent={renderSubComponent}
                isLoading={isLoading}
            />
        </div>
    );
};
export default Events;
