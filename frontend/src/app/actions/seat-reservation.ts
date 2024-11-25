import http from "@/lib/http";
import queryString from "querystring";
import { bearerTokenHeader } from "./utils";

export async function returnSeat({
    seatNumber,
    orderId,
}: {
    seatNumber: number;
    orderId: number;
}) {
    const data = await http.delete<any>(
        `/api/seat-reservation?${queryString.stringify({
            seatNumber,
            orderId,
        })}`,
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}
