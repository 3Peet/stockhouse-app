"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
	email: z.string().email().min(5),
	password: z.string().min(2).max(50),
});

export const description =
	"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm() {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, password } = values;
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				toast({
					variant: "destructive",
					title:
						result.status === 401
							? "Email or Password incorrect"
							: "Uh oh! Something went wrong",
				});
			} else {
				router.push("/profile");
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong",
				description: "There was a problem with your request.",
			});
		}
	}

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
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
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex justify-between items-center">
										Password{" "}
										<Link href="#" className="inline-block text-sm underline">
											Forgot your password?
										</Link>
									</FormLabel>
									<FormControl>
										<Input id="password" type="password" required {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Login
						</Button>
						<Button variant="outline" className="w-full">
							Login with Google
						</Button>
					</form>
				</Form>

				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="#" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
