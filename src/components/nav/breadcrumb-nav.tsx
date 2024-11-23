"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export default function BreadcrumbNav() {
    const pathname = usePathname();
    
    const segments = pathname
        .split('/')
        .filter(Boolean)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
    
    return (
        <Breadcrumb className="ml-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trade Pilot</BreadcrumbLink>
                </BreadcrumbItem>
                
                {segments.map((segment) => (
                    <React.Fragment key={segment}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${segment.toLowerCase()}`}>
                                {segment}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}