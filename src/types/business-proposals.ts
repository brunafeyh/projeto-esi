import { z } from 'zod'
import { BusinessProposalFormProps } from './forms-values'

export const paragraphItemSchema = z.object({
	type: z.literal('paragraph'),
	children: z.array(
		z.object({
			text: z.string(),
		})
	),
})

export type ParagraphItem = z.infer<typeof paragraphItemSchema>

const paymentTypeSchema = z.object({
	id: z.number(),
	name: z.string(),
	text: z.string(),
	valueInExcel: z.string(),
})

export type PaymentTypeItem = z.infer<typeof paymentTypeSchema>

export const scheduleItemSchema = z.object({
	description: z.string(),
	duration: z.number(),
})

export type ScheduleItem = z.infer<typeof scheduleItemSchema>

export const businessProposalTypeSchema = z.object({
	finalResultsText: z.string(),
	id: z.number(),
	name: z.string(),
	proposalPresentationText: z.string(),
	proposalTitle: z.string(),
	schedule: z.array(scheduleItemSchema),
	scheduleText: z.string(),
	scope: z.string(),
	valueInExcel: z.string(),
})

export type BusinessProposalType = z.infer<typeof businessProposalTypeSchema>

export const businessProposaldetailedSchema = z.object({
	cnpj: z.string(),
	company: z.string(),
	confidentialityText: z.string(),
	date: z.date(),
	finalResultsText: z.string(),
	generalConditionText: z.string(),
	id: z.number().int(),
	number: z.string(),
	paymentType: paymentTypeSchema,
	proposalHandler: z.string(),
	proposalPresentationText: z.string(),
	proposalTitle: z.string(),
	recipient: z.string(),
	schedule: z.array(z.null()),
	scheduleText: z.string(),
	scope: z.string(),
	tributesText: z.string(),
	type: businessProposalTypeSchema,
	value: z.number(),
})

export type BusinessProposalDetailed = z.infer<typeof businessProposaldetailedSchema>

export const scheduleItemDetailedSchema = z.object({
	businessProposal: businessProposaldetailedSchema,
	description: z.string(),
	duration: z.number(),
	id: z.number().int(),
})

export type ScheduleItemDetailed = z.infer<typeof scheduleItemDetailedSchema>

export const businessProposalListItemSchema = z.object({
	cnpj: z.string(),
	company: z.string(),
	date: z.date(),
	id: z.number().int(),
	number: z.string(),
	paymentType: z.string(),
	pdfName: z.string(),
	proposalHandler: z.string(),
	recipient: z.string(),
	type: z.string(),
	value: z.number(),
})

export type BusinessProposalListItem = z.infer<typeof businessProposalListItemSchema>

export const businessProposalStandardSchema = z.object({
	cnpj: z.string(),
	company: z.string(),
	confidentialityText: z.string(),
	date: z.date(),
	finalResultsText: z.string(),
	generalConditionText: z.string(),
	id: z.number().int(),
	number: z.string(),
	paymentType: z.string(),
	proposalHandler: z.string(),
	proposalPresentationText: z.string(),
	proposalTitle: z.string(),
	recipient: z.string(),
	schedule: z.array(scheduleItemSchema),
	scheduleText: z.string(),
	scope: z.string(),
	tributesText: z.string(),
	type: z.string(),
	value: z.number(),
})

export type StandardBusinessProposal = z.infer<typeof businessProposalStandardSchema>

export const activitySchema = z.object({
	descrition: z.string(),
	duration: z.number(),
})

export type Activity = z.infer<typeof activitySchema>

export type UpdateBusinessProposalArgs = {
	id: number
	businessProposal: BusinessProposalFormProps
}
