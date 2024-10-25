"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ChevronsUpDown,
	Sparkles,
	BadgeCheck,
	CreditCard,
	Bell,
	LogOut,
} from "lucide-react";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import Avatar, { genConfig } from "react-nice-avatar";

import { useSession, signOut } from "next-auth/react";

export default function AppSidebarFooter() {
	const { data: session } = useSession();

	const config = genConfig(session?.user.email);

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size="lg">
								<Avatar {...config} className="w-8 h-8" />
								<div className="flex flex-col">
									<span className="truncate font-semibold">
										{session?.user.name}
									</span>
									<span className="truncate text-xs">
										{session?.user.email}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="bottom"
							align="end"
							sideOffset={4}
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						>
							<DropdownMenuLabel className="font-normal">
								<div className="flex gap-2 items-center text-sm">
									<Avatar {...config} className="w-8 h-8" />
									<div className="flex flex-col leading-tight">
										<span className="truncate font-semibold">
											{session?.user.name}
										</span>
										<span className="truncate text-xs">
											{session?.user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => signOut()}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
