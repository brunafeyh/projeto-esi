const generateNamedAvatarIcon = (name?: string) => {
	if (name) {
		const fullName = name.split(' ') ?? ''
		const stNameInitial = fullName.shift()?.charAt(0)
		const lastNameInitial = fullName.pop()?.charAt(0)

		const initials = `${stNameInitial ?? ''}${lastNameInitial ?? ''}`

		return initials.toUpperCase()
	} else {
		return 'AA'
	}
}

export default generateNamedAvatarIcon
