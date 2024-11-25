import { TableCell, TableRow } from "@/components/ui/table";
import { OrderStatus } from "@/types/order";
import OrderItem from "@/types/order-item";
import { checkRating } from "@/services/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import OrderReviewDialog from "./order-review-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleError } from "@/lib/utils";
import toast from "react-hot-toast";
import { addReview } from "@/app/actions/review";

export default function OrderItemDialogItem({
    item,
    orderStatus,
}: {
    item: OrderItem;
    orderStatus: OrderStatus;
}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data } = useQuery({
        queryKey: ["check-rating", item.id],
        queryFn: () => checkRating(item.id),
    });

    async function handleAddReview(payload: FormData) {
        payload.append("orderItemId", item.id.toString());
        payload.append("createAt", new Date().toString());

        try {
            const data = await addReview(payload);

            if (data?.error) {
                handleError(data.error);
            } else {
                toast.success("Successfully");
                queryClient.invalidateQueries({
                    queryKey: ["check-rating", item.id],
                });
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <TableRow className="border-b border-primary-dark">
            <TableCell className="whitespace-nowrap px-6 py-4">
                {item.item.name}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                <div
                    className="w-[50px] h-[50px] bg-center bg-cover rounded-md hover:cursor-pointer"
                    style={{
                        backgroundImage: `url(${item.item.thumbnail})`,
                    }}
                    onClick={() => router.push(`/food/${item.itemId}`)}
                />
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                ${item.price}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4">
                {item.quantity}
            </TableCell>
            <TableCell className="whitespace-nowrap px-6 py-4 text-center">
                {!data?.isRated && orderStatus === "Success" ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <OrderReviewDialog
                                    onAddReview={handleAddReview}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Write a feedback</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : null}
            </TableCell>
        </TableRow>
    );
}
