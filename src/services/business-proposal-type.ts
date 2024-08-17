import bpAPI from "../shared/api"
import { BusinessProposalType } from "../types/business-proposals"

export class BusinessProposalTypeService {
	private api = bpAPI

	async listBusinessProposalTypes(): Promise<BusinessProposalType[]> {
		const response = await this.api.get<BusinessProposalType[]>('business-proposal-type')
		return response.data ?? []
	}
	async getBusinessProposalType(id: number): Promise<BusinessProposalType> {
		const response = await this.api.get<BusinessProposalType>(`business-proposal-type/${id}`)
		return response.data ?? []
	}
	async deleteBusinessProposalType(id: number): Promise<void> {
		await bpAPI.delete(`business-proposal-type/${id}`)
	}
}
