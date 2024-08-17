import { z } from 'zod'
import { scheduleItemDetailedSchema } from './business-proposals'

export const spreadsheetSettingsFormSchema = z.object({
	companyCell: z.string(),
	cnpjCell: z.string(),
	recipientCell: z.string(),
	proposalHandlerCell: z.string(),
	typeCell: z.string(),
	numberCell: z.string(),
	valueCell: z.string(),
	paymentTypeCell: z.string(),
	file: z.any().optional(),
})

export type SpreadsheetSettingsFormProps = z.infer<typeof spreadsheetSettingsFormSchema>

export const BusinessProposalSchemaFormProps = z.object({
	cnpj: z.string(),
	company: z.string(),
	confidentialityText: z.string(),
	finalResultsText: z.string(),
	generalConditionText: z.string(),
	number: z.string(),
	paymentType: z.string(),
	proposalHandler: z.string(),
	proposalPresentationText: z.string(),
	proposalTitle: z.string(),
	recipient: z.string(),
	schedule: z.array(scheduleItemDetailedSchema),
	scheduleText: z.string(),
	scope: z.string(),
	tributesText: z.string(),
	type: z.string(),
	value: z.number(),
})

export type BusinessProposalFormProps = z.infer<typeof BusinessProposalSchemaFormProps>
