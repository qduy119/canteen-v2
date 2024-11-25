import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSeats } from "@/services/seat";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon, Utensils } from "lucide-react";
import { useRef, useState } from "react";

function isAvailableSeat({
    seats,
    seatNumber,
}: {
    seats: any;
    seatNumber: number;
}) {
    const allSeats = seats?.reduce((result: any, item: any) => {
        result.push(item.seatNumber);
        return result;
    }, []);
    return !allSeats?.includes(seatNumber);
}

export default function SeatDialog({
    onSetSeat,
}: {
    onSetSeat: (seatNumber: number) => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const { data: seats } = useQuery({
        queryFn: () => getSeats(),
        queryKey: ["seat"],
    });

    function handleSave() {
        if (selected) {
            onSetSeat(selected);
            ref.current?.click();
        }
    }

    return (
        <Dialog>
            <DialogTrigger ref={ref} asChild>
                <Button className="w-fit">
                    SEAT RESERVATION <ChevronRightIcon />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Choose a seat</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-5 gap-10">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (seatNumber) => (
                            <div key={seatNumber}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() =>
                                                    setSelected(seatNumber)
                                                }
                                                disabled={
                                                    !isAvailableSeat({
                                                        seats,
                                                        seatNumber,
                                                    })
                                                }
                                            >
                                                <Utensils
                                                    className={
                                                        selected === seatNumber
                                                            ? "text-secondary"
                                                            : ""
                                                    }
                                                />
                                            </Button>
                                        </TooltipTrigger>
                                        {isAvailableSeat({
                                            seats,
                                            seatNumber,
                                        }) ? null : (
                                            <TooltipContent>
                                                <p>Seat not available</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                                <p>No. {seatNumber}</p>
                            </div>
                        )
                    )}
                </div>
                <p className="mt-5 font-medium text-primary">
                    Your seat:{" "}
                    <span className="font-bold">{selected ?? "None"}</span>
                </p>
                <DialogFooter className="!justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    {selected && (
                        <Button type="submit" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
