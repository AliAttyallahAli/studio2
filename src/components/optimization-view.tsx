"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Sparkles, Wand2 } from "lucide-react"

import { optimizeMiningSettings, type OptimizeMiningSettingsOutput } from "@/ai/flows/optimize-mining-settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  currentHashRate: z.coerce.number().positive("Must be a positive number."),
  currentPowerConsumption: z.coerce.number().positive("Must be a positive number."),
  miningPool: z.string().min(1, "Mining pool is required."),
  coinType: z.string().min(1, "Coin type is required."),
  hardwareConfiguration: z.string().min(10, "Please provide more detail."),
  electricityCostPerKWh: z.coerce.number().min(0, "Cannot be negative."),
})

export function OptimizationView() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<OptimizeMiningSettingsOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentHashRate: 1.25,
      currentPowerConsumption: 3000,
      miningPool: "Ethermine",
      coinType: "Ethereum Classic",
      hardwareConfiguration: "8x NVIDIA RTX 3080",
      electricityCostPerKWh: 0.12,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    try {
      const response = await optimizeMiningSettings(values)
      setResult(response)
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "An error occurred while communicating with the AI. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Optimization</CardTitle>
          <CardDescription>
            Provide your current mining configuration, and our AI will suggest optimized settings to maximize profitability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentHashRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Hashrate (TH/s)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentPowerConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Power Consumption (W)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="miningPool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mining Pool</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a pool" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ethermine">Ethermine</SelectItem>
                          <SelectItem value="2Miners">2Miners</SelectItem>
                          <SelectItem value="Flexpool">Flexpool</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coinType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cryptocurrency</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a coin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ethereum Classic">Ethereum Classic (ETC)</SelectItem>
                          <SelectItem value="Ravencoin">Ravencoin (RVN)</SelectItem>
                          <SelectItem value="Ergo">Ergo (ERG)</SelectItem>
                          <SelectItem value="Monero">Monero (XMR)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="hardwareConfiguration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hardware Configuration</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 8x NVIDIA RTX 3080, 2x AMD Radeon VII" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="electricityCostPerKWh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electricity Cost ($/kWh)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Optimize Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-8">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="text-accent" />
                AI Recommendations
            </CardTitle>
            <CardDescription>
              {isLoading ? "Analyzing your configuration..." : "Optimal settings will appear here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin" />
                        <p className="mt-4">AI is crunching the numbers...</p>
                    </div>
                </div>
            ) : result ? (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Suggested Hashrate</p>
                        <p className="text-xl font-bold font-headline">{result.suggestedHashRate.toFixed(2)} TH/s</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Suggested Power</p>
                        <p className="text-xl font-bold font-headline">{result.suggestedPowerConsumption} W</p>
                    </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Suggested Pool</p>
                    <p className="text-xl font-bold font-headline">{result.suggestedPool}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 font-headline">Reasoning</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{result.reasoning}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <Wand2 className="mx-auto h-12 w-12" />
                    <p className="mt-4">Submit your settings to get AI-powered advice.</p>
                </div>
              </div>
            )}
          </CardContent>
           {result && (
              <CardFooter className="bg-green-500/10 p-4 rounded-b-lg border-t border-green-500/20">
                <div className="flex flex-col">
                  <p className="text-sm text-green-800/80">Estimated New Profitability</p>
                  <p className="text-2xl font-bold text-green-600 font-headline">${result.estimatedProfitability.toFixed(2)} / day</p>
                </div>
              </CardFooter>
            )}
        </Card>
      </div>
    </div>
  )
}
