import { TransactionSection } from "@/components/transactions-section";
import { ModeToggle } from "@/components/mode-toggle";
import { SectionCards } from "@/components/summary-section";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 px-8 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-3">
            <Image
              src={"/finance-logo.png"}
              alt="financ-logo"
              height={42}
              width={42}
            />
            <h1 className="text-2xl text-pretty font-bold">Finance App</h1>
          </div>
          <ModeToggle />
        </header>
        <section className="flex flex-col px-4">
          <div className="flex flex-col gap-4 pt-0">
            <SectionCards />
          </div>
          <div className="p-4">
            <TransactionSection />
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
