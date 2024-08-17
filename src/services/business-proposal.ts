import bpAPI from '@/shared/api'
import { BusinessProposalListItem, StandardBusinessProposal } from '@/types/business-proposals'
import { BusinessProposalFormProps, SpreadsheetSettingsFormProps } from '@/types/forms-values'

export class BusinessProposalService {
	private api = bpAPI

	async listAllBusinessProposals(): Promise<BusinessProposalListItem[]> {
		const response = await this.api.get<BusinessProposalListItem[]>('business-proposal')
		return response.data ?? []
	}

	async listFilteredBusinessProposals(filters: string): Promise<BusinessProposalListItem[]> {
		const response = await this.api.get<BusinessProposalListItem[]>('business-proposal', {
			params: { filters },
		})
		return response.data ?? []
	}

	async getBusinessProposal(id: number): Promise<StandardBusinessProposal> {
		const response = await this.api.get<StandardBusinessProposal>(`business-proposal/${id}`)
		return response.data ?? []
	}

	async deleteBusinessProposal(id: number): Promise<void> {
		await bpAPI.delete(`business-proposal/${id}`)
	}

	async updateBusinessProposal(id: number, businessProposal: BusinessProposalFormProps): Promise<void> {
		await bpAPI.put(`business-proposal/${id}`, businessProposal)
	}

	async getBusinessProposalPDF(id: number): Promise<Blob> {
		const response = await bpAPI.get(`business-proposal/generate-pdf/${id}`, {
			responseType: 'blob',
		})
		return response.data
	}

	async createFromExcel(formData: SpreadsheetSettingsFormProps): Promise<StandardBusinessProposal> {
		const response = await bpAPI.post('/business-proposal/read-excel', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	}
}
