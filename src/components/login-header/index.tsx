import { PresentationContainer, Title, Typography } from './styles';

const LoginHeader = () => {
    return (
        <PresentationContainer style={{ position: 'relative', display: 'inline-block' }}>
            <Title variant="h4"> Receba carinho em forma de sabor! </Title>
            <Typography variant="h4"> ~ Restaurante carinho </Typography>
                <img
                    src="/images/imagem-login.png"
                    alt="Imagem de prato"
                    style={{ width: '100%', height: '100%' }}
                />
        </PresentationContainer>
    )
}
export default LoginHeader