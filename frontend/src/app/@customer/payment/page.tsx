import { updateOrderStatus } from "@/app/actions/order";
import { createPayment } from "@/app/actions/payment";
import { PaymentStatus } from "@/types/payment";
import moment from "moment";
import Link from "next/link";

interface SearchParams {
    [key: string]: string;
}

export default async function PaymentPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const amount = searchParams.vnp_Amount;
    const bankCode = searchParams.vnp_BankCode;
    const cardType = searchParams.vnp_CardType;
    const payDate = searchParams.vnp_PayDate;
    const orderId = searchParams.vnp_TxnRef;
    const status =
        searchParams.vnp_TransactionStatus === "00"
            ? "Success"
            : ("Error" as PaymentStatus);

    if (amount && bankCode && cardType && orderId && payDate && status) {
        await updateOrderStatus({ orderId: Number(orderId), status });

        const paymentPayload = {
            orderId: Number(orderId),
            payDate: moment(payDate, "YYYYMMDDHHmmss").toDate(),
            bankCode,
            cardType,
            amount: Number(amount) / 100000,
            status,
        };

        await createPayment(paymentPayload);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
                <div
                    className={`${
                        status === "Success" ? "bg-green-600" : "bg-yellow-400"
                    } w-[81px] h-[81px] rounded-full text-white mx-auto flex justify-center items-center text-4xl`}
                >
                    {status === "Success" ? "✔" : "❌"}
                </div>
                <div className="text-center mt-5">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        {status === "Success"
                            ? "Payment Done!"
                            : "Payment Error!"}
                    </h3>
                    <p className="text-gray-600 my-2">
                        {status === "Success"
                            ? "Thank you for completing your secure online payment."
                            : "There is something wrong."}
                    </p>
                    {status === "Error" && (
                        <p> Sorry for any inconveniences! </p>
                    )}
                    <div className="py-6 text-center">
                        <Link
                            href="/order"
                            className="block px-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold py-3 transition-all duration-300"
                        >
                            CONTINUE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
