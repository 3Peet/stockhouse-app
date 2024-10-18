"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
	const { data: session, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status, router]);

	if (!session) {
		return (
			<div className="h-dvh flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="h-dvh flex justify-center items-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle>Welcome, {session?.user.name}</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<p>{session?.user.email}</p>
					<p>{session?.user.role}</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
						eligendi necessitatibus blanditiis vitae accusantium dolor, aliquid
						eaque dicta eos dignissimos porro natus ullam laborum! Aliquam
						consectetur esse aliquid ea animi.
					</p>
					<Button
						className="mt-4"
						onClick={() => signOut({ callbackUrl: "/" })}
					>
						Logout
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
