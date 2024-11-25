import Seat from "@/types/seat";

export async function getSeats(): Promise<Seat[]> {
    const res = await fetch("/api/seat-reservation", {
        cache: "no-cache",
    });
    const data = await res.json();

    return data;
}
