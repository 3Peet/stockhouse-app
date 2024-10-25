import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col min-h-svh w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
