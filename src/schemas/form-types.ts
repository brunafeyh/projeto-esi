import { z } from 'zod'

export const credentialsSchema = z.object({
	email: z
		.string()
		.nonempty('Username ou email é obrigatório')
		.regex(/^(?:[a-z]+|[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,})$/i, 'Deve ser um nome de usuário ou email válidos'),
	password: z.string().nonempty('Senha é obrigatória'),
})

// Create an interface for the form data
export type AuthCredentials = z.output<typeof credentialsSchema>
