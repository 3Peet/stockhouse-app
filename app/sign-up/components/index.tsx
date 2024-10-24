"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email().min(5),
	password: z.string().min(5).max(50),
});

export default function SignUpForm() {
	const router = useRouter();
	const { mutate } = useMutation({
		mutationFn: (payload: z.infer<typeof formSchema>) =>
			axios.post("/api/auth/signup", payload),
		onSuccess: () => router.push("/login"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

	return (
		<Card className="mx-auto max-w-sm sm:w-[420px]">
			<CardHeader>
				<CardTitle className="text-2xl">Register</CardTitle>
				<CardDescription>Create a new account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												id="name"
												placeholder="Enter your name"
												required
												{...field}
											/>
										</FormControl>
									</FormItem>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												id="email"
												type="email"
												placeholder="m@example.com"
												required
												{...field}
											/>
										</FormControl>
									</FormItem>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												id="password"
												type="password"
												placeholder="Enter your password"
												required
												{...field}
											/>
										</FormControl>
									</FormItem>
								</FormItem>
							)}
						/>

						<Button type="submit" className="mt-2 w-full">
							Register
						</Button>
						<Button variant="link" onClick={() => router.push("/login")}>
							Already have an account? Login
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
