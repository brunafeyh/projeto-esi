import axios from 'axios'

const keycloakAPI = axios.create({
	baseURL: import.meta.env.VITE_KEYCLOAK_SERVER,
})

export default keycloakAPI
