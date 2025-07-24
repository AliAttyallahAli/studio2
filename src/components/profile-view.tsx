"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  bio: z.string().max(160, "Bio must not be longer than 160 characters.").optional(),
})

export function ProfileView() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Replace with actual user data fetching
  const currentUser = {
    name: "Satoshi Nakamoto",
    email: "satoshi@gmx.com",
    bio: "Creator of Bitcoin, solving the double-spending problem.",
    avatarUrl: "https://placehold.co/128x128",
  }

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio,
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    console.log("Updating profile with:", values)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
    
    setIsLoading(false)
  }

  return (
    <div>
        <h1 className="text-3xl font-headline font-bold mb-6">User Profile</h1>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Profile Information</CardTitle>
                <CardDescription>
                Manage your account settings and public profile.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={currentUser.avatarUrl} alt="User avatar" data-ai-hint="male avatar" />
                        <AvatarFallback>
                            <User className="h-10 w-10 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <Button>Change Photo</Button>
                        <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Biography</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button type="submit" form="profile-form" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
