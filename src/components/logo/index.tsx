import * as React from 'react'
import { Stack } from '@mui/material'

const Logo: React.FC = () => {
	return (
		<Stack direction="column" alignItems="flex-start" marginLeft="28px" flexGrow={1}>
				<img
					src="/images/logo-restaurante-esi.png"
					alt="logo do Restaurante"
					style={{  width: '160px', height: '60px', marginBottom: 'auto' }}
				/>
		</Stack>
	)
}
export default Logo
