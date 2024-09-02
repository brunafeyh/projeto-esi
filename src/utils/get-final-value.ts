
export const getFinalValue = (price: number, pontuation: number) => {
	return price - (pontuation * 0.03)
}
