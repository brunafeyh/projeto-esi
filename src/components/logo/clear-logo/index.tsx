import { Stack } from '@mui/material'
import { theme } from '../../../themes'
import { FC } from 'react'

const ClearLogo: FC = () => {
	return (
		<Stack direction="column" alignItems="flex-start" marginLeft="28px" flexGrow={1}>
				<img
					src="/images/logo-restaurante-clara.png"
					alt="logo do Restaurante"
					style={{  width: '200px', height: '80px', marginLeft: theme.spacing(7), marginBottom: theme.spacing(1) }}
				/>
		</Stack>
	)
}
export default ClearLogo
