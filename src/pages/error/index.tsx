import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import NotFoundContainer from '../../layouts/not-found-container'
import { Button, ErrorCode, ErrorTitle, Stack } from './styles'

interface Props {
  code: number
  title: string
}

const ErrorPage: FC<Props> = ({ code, title }) => {
  const navigate = useNavigate()
  const handleGoHome = () => navigate('/')

  return (
    <NotFoundContainer>
      <Stack justifyContent="center" alignItems="center">
        <ErrorCode variant="h1">
          {code}
        </ErrorCode>
        <ErrorTitle variant="h2">
          {title}
        </ErrorTitle>
        <Button variant='contained' onClick={handleGoHome}>
          Voltar para a Página Inicial
        </Button>
      </Stack>
    </NotFoundContainer>
  )
}

export default ErrorPage