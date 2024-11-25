import Footer from "./_components/footer";
import Header from "./_components/header";

export default async function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Header />
            <section className="mt-[140px] md:mt-[90px] min-h-screen">
                {children}
            </section>
            <Footer />
        </main>
    );
}
