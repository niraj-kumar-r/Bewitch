"use client";

// import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state);

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />
                <RecommendedSkeleton />
            </aside>
        );
    }
    // This skeleton is not used as a fallback for the suspense element, this just takes care of server side rendering without hydration errors

    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
                collapsed && "w-[70px]"
            )}
        >
            {children}
        </aside>
    );
};
