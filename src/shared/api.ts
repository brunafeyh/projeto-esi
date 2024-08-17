
import axios from 'axios'
import { ACCESS_TOKEN_KEY } from '../utils/constants/values'

const token = localStorage.getItem(ACCESS_TOKEN_KEY)

const bpAPI = axios.create({
	baseURL: import.meta.env.VITE_BP_GENERATOR_API,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
		Authorization: `Bearer ${token ? JSON.parse(token) : ''}`,
	},
})

export default bpAPI
