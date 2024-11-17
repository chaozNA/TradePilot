import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <header>
                <ModeToggle />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}