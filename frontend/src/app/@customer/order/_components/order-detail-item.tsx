import OrderStatus from "@/components/order-status";
import { TableCell, TableRow } from "@/components/ui/table";
import Order from "@/types/order";
import { formatDate } from "@/lib/utils";
import OrderItemAction from "./order-item-action";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import OrderItemDialog from "./order-item-dialog";
import Seat from "@/types/seat";

export default function OrderDetailItem({
    index,
    order,
    seats,
    onPayOrder,
    onCancelOrder,
    onReturnTable,
}: {
    index: number;
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
        <TableRow>
            <TableCell className="whitespace-nowrap px-6 py-4 font-medium">
                {index}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order.id}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {formatDate(order.orderDate)}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order.payment?.payDate
                    ? formatDate(order.payment.payDate)
                    : "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order.payment?.bankCode ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order.payment?.cardType ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order?.couponCode ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order?.couponTitle ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order?.discountPercentage ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                ${order.total}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {order.seatNumber ?? "Null"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center justify-center">
                    <OrderStatus status={order.status} />
                </div>
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                <OrderItemAction
                    order={order}
                    seats={seats}
                    onPayOrder={onPayOrder}
                    onCancelOrder={onCancelOrder}
                    onReturnTable={onReturnTable}
                />
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <OrderItemDialog
                                orderItems={order.orderItems}
                                orderStatus={order.status}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Detail</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
        </TableRow>
    );
}
