import { ContainerApresentation, ContainerLogoImages, PresentationContainer, TitleBP } from './styles'

const LoginHeader = () => {
	return (
		<PresentationContainer>
			<ContainerApresentation>
				<img
					src="/images/logotype.svg"
					alt="logo do BP Generator"
					style={{ width: '360px', height: '42.44px' }}
				/>

				<TitleBP>Bussiner Proposal Generator</TitleBP>
			</ContainerApresentation>
			<ContainerLogoImages>
				<img src="/images/GEDT-novo-branco.svg" alt="logo do GE.DT e do PTI" />
			</ContainerLogoImages>
		</PresentationContainer>
	)
}

export default LoginHeader
