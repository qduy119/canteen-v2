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
import { EyeIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import OrderItem from "@/types/order-item";
import OrderItemDialogItem from "./order-item-dialog-item";
import { OrderStatus } from "@/types/order";

export default function OrderItemDialog({
    orderItems,
    orderStatus,
}: {
    orderItems: OrderItem[] | undefined;
    orderStatus: OrderStatus;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <EyeIcon className="hover:text-primary transition-all" />
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-fit"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>Your Order Detail</DialogTitle>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead scope="col" className="px-6 py-4">
                                Name
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-4">
                                Thumbnail
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-4">
                                Price
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-4">
                                Quantity
                            </TableHead>
                            <TableHead scope="col" className="px-6 py-4">
                                Feedback
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderItems?.map((item) => (
                            <OrderItemDialogItem
                                key={item.id}
                                item={item}
                                orderStatus={orderStatus}
                            />
                        ))}
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
