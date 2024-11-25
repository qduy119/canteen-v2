import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BanknoteIcon, CircleXIcon, CornerDownLeftIcon } from "lucide-react";
import Order from "@/types/order";
import Seat from "@/types/seat";

function isSeatReturned(payload: {
    seats: Seat[] | undefined;
    orderId: number;
    seatNumber: number;
}) {
    return !payload.seats?.some(
        (seat) =>
            seat.orderId === payload.orderId &&
            seat.seatNumber === payload.seatNumber
    );
}

export default function OrderAction({
    order,
    seats,
    onPayOrder,
    onCancelOrder,
    onReturnTable,
}: {
    order: Order;
    seats: Seat[] | undefined;
    onPayOrder: (payload: {
        orderId: number;
        amount: number;
        bankCode: string;
    }) => void;
    onCancelOrder: (orderId: number) => void;
    onReturnTable: (payload: { orderId: number; seatNumber: number }) => void;
}) {
    return (
        <div className="flex gap-2 items-center justify-center">
            {order.status === "Pending" ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                onClick={() =>
                                    onPayOrder({
                                        orderId: order.id,
                                        amount: order.total,
                                        bankCode: "NCB",
                                    })
                                }
                            >
                                <BanknoteIcon className="hover:text-green-500 transition-all" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Pay Order</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button onClick={() => onCancelOrder(order.id)}>
                                <CircleXIcon className="hover:text-red-500 transition-all" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Cancel Order</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : order.status === "Success" && order.seatNumber ? (
                isSeatReturned({
                    seats,
                    orderId: order.id,
                    seatNumber: order.seatNumber,
                }) ? null : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CornerDownLeftIcon
                                    onClick={() =>
                                        onReturnTable({
                                            orderId: order.id,
                                            seatNumber: order.seatNumber,
                                        })
                                    }
                                    className="hover:text-primary transition-all"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Return Seat</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            ) : null}
        </div>
    );
}
