import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Order from "@/types/order";
import OrderDetailItem from "./order-detail-item";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { handleError } from "@/lib/utils";
import toast from "react-hot-toast";
import { getSeats } from "@/services/seat";
import { returnSeat } from "@/app/actions/seat-reservation";
import { cancelOrder, payOrder } from "@/app/actions/order";

export default function OrderDetail({
    orders,
}: {
    orders: Order[] | undefined;
}) {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { data: seats } = useQuery({
        queryKey: ["seats"],
        queryFn: getSeats,
    });

    async function handlePayOrder(payload: {
        orderId: number;
        amount: number;
        bankCode: string;
    }) {
        try {
            const data = await payOrder(payload);

            if (data?.error) {
                handleError(data?.error);
            } else {
                window.open(data, "_self");
                queryClient.invalidateQueries({ queryKey: ["orders", page] });
            }
        } catch (error) {
            handleError(error);
        }
    }
    async function handleCancelOrder(orderId: number) {
        try {
            const data = await cancelOrder(orderId);

            if (data?.error) {
                handleError(data.error);
            } else {
                toast.success("Cancel order successfully");
                queryClient.invalidateQueries({ queryKey: ["orders", page] });
            }
        } catch (error) {
            handleError(error);
        }
    }
    async function handleReturnTable(payload: {
        orderId: number;
        seatNumber: number;
    }) {
        try {
            const data = await returnSeat(payload);

            if (data?.error) {
                handleError(data.error);
            } else {
                toast.success("Return table successfully");
                queryClient.invalidateQueries({ queryKey: ["seats"] });
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-6 py-4">Tracking No.</TableHead>
                    <TableHead className="px-6 py-4">Order ID</TableHead>
                    <TableHead className="px-6 py-4">Order Date</TableHead>
                    <TableHead className="px-6 py-4">Pay Date</TableHead>
                    <TableHead className="px-6 py-4">Bank Code</TableHead>
                    <TableHead className="px-6 py-4">Card Type</TableHead>
                    <TableHead className="px-6 py-4">Coupon Code</TableHead>
                    <TableHead className="px-6 py-4">Coupon Title</TableHead>
                    <TableHead className="px-6 py-4">
                        Discount Percentage
                    </TableHead>
                    <TableHead className="px-6 py-4">Amount</TableHead>
                    <TableHead className="px-6 py-4">Seat Number</TableHead>
                    <TableHead className="px-6 py-4">Status</TableHead>
                    <TableHead className="px-6 py-4">Action</TableHead>
                    <TableHead className="px-6 py-4">Detail</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders?.map((order, index) => (
                    <OrderDetailItem
                        key={order.id}
                        index={(page - 1) * 10 + index + 1}
                        order={order}
                        seats={seats}
                        onPayOrder={handlePayOrder}
                        onCancelOrder={handleCancelOrder}
                        onReturnTable={handleReturnTable}
                    />
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
