// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing mining settings.
 *
 * The flow analyzes a user's current mining configuration and suggests optimized settings based on current network conditions and pool performance to maximize mining profitability.
 *
 * @exports `optimizeMiningSettings` - The main function to trigger the mining settings optimization flow.
 * @exports `OptimizeMiningSettingsInput` - The input type for the `optimizeMiningSettings` function.
 * @exports `OptimizeMiningSettingsOutput` - The output type for the `optimizeMiningSettings` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeMiningSettingsInputSchema = z.object({
  currentHashRate: z.number().describe('The current hash rate of the mining setup.'),
  currentPowerConsumption: z
    .number()
    .describe('The current power consumption of the mining setup in watts.'),
  miningPool: z.string().describe('The mining pool currently being used.'),
  coinType: z.string().describe('The type of cryptocurrency being mined (e.g., Ethereum Classic).'),
  hardwareConfiguration: z
    .string()
    .describe('A description of the mining hardware configuration.'),
  electricityCostPerKWh: z.number().describe('The cost of electricity per kilowatt-hour.'),
});

export type OptimizeMiningSettingsInput = z.infer<typeof OptimizeMiningSettingsInputSchema>;

const OptimizeMiningSettingsOutputSchema = z.object({
  suggestedHashRate: z
    .number()
    .describe('The suggested optimal hash rate for maximizing profitability.'),
  suggestedPowerConsumption: z
    .number()
    .describe('The suggested optimal power consumption for maximizing profitability.'),
  suggestedPool: z
    .string()
    .describe('The suggested mining pool based on performance and network conditions.'),
  estimatedProfitability: z
    .number()
    .describe('The estimated profitability after applying the suggested settings.'),
  reasoning: z.string().describe('The detailed reasoning behind the suggested settings.'),
});

export type OptimizeMiningSettingsOutput = z.infer<typeof OptimizeMiningSettingsOutputSchema>;

export async function optimizeMiningSettings(input: OptimizeMiningSettingsInput): Promise<
  OptimizeMiningSettingsOutput
> {
  return optimizeMiningSettingsFlow(input);
}

const optimizeMiningSettingsPrompt = ai.definePrompt({
  name: 'optimizeMiningSettingsPrompt',
  input: {schema: OptimizeMiningSettingsInputSchema},
  output: {schema: OptimizeMiningSettingsOutputSchema},
  prompt: `You are an expert mining optimization consultant.

Analyze the user's current mining configuration and suggest optimized settings to maximize profitability.

Consider the following factors:
- Current hash rate: {{{currentHashRate}}}
- Current power consumption: {{{currentPowerConsumption}}} watts
- Mining pool: {{{miningPool}}}
- Coin type: {{{coinType}}}
- Hardware configuration: {{{hardwareConfiguration}}}
- Electricity cost: {{{electricityCostPerKWh}}} per kWh

Provide the following:
- Suggested optimal hash rate.
- Suggested optimal power consumption.
- Suggested mining pool based on performance and network conditions.
- Estimated profitability after applying the suggested settings.
- Detailed reasoning behind the suggested settings.

Ensure that the suggested settings are safe and sustainable for the user's hardware.

Output in JSON format.
`,
});

const optimizeMiningSettingsFlow = ai.defineFlow(
  {
    name: 'optimizeMiningSettingsFlow',
    inputSchema: OptimizeMiningSettingsInputSchema,
    outputSchema: OptimizeMiningSettingsOutputSchema,
  },
  async input => {
    const {output} = await optimizeMiningSettingsPrompt(input);
    return output!;
  }
);
