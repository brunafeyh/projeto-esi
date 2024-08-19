import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutButton, LogoutIconProfile, UserEmailTitle, UserNameTitle, UserRoleTitle } from './styles'
import { useAuth } from '../../hooks/use-auth'

const Profile: React.FC = () => {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	console.log(user?.role)

	const handleLogout = async () => {
		try {
			await logout()
			navigate('/login')
		} catch (error) {
			console.error('Logout error:', error)
		}
	}
	if (!user) return null

	return (
		<>
			<UserNameTitle>{user.name}</UserNameTitle>
			<UserEmailTitle>{user.email}</UserEmailTitle>
			<UserEmailTitle>{user.cpf}</UserEmailTitle>
			<UserRoleTitle>{user.role}</UserRoleTitle>
			<LogoutButton variant="contained" startIcon={<LogoutIconProfile />} onClick={handleLogout}>
				Sair
			</LogoutButton>
		</>
	)
}

export default Profile
