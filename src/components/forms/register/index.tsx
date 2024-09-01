import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdornment, Stack, Tooltip, Typography, Link as MuiLink } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconButtonLoginForm, LoginFormContainer, TextField, TitleRegister } from '../login/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../hooks/use-auth';
import { ButtonLoginForm } from '../login/styles';
import { credentialsSchema, RegisterCredentials } from '../../../types/auth';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(credentialsSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const response = await register(data);
      if (response) {
        setRegistrationError(null);
        navigate('/login');
        window.location.reload();
      } else {
        setRegistrationError('Erro ao registrar usuário');
      }
    } catch (error) {
      console.error('Erro no servidor:', error);
      setRegistrationError('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registrationError && (
        <Typography color="error" sx={{ fontSize: '1rem', marginTop: '1rem' }}>
          {registrationError}
        </Typography>
      )}
      <LoginFormContainer>
        <TextField
          {...formRegister('name')}
          id="name"
          label="Nome"
          variant="filled"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...formRegister('cpf')}
          id="cpf"
          label="CPF"
          variant="filled"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
        />
        <TextField
          {...formRegister('email')}
          id="email"
          label="Email"
          variant="filled"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...formRegister('password')}
          id="password"
          label="Senha"
          variant="filled"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={showPassword ? 'Ocultar senha' : 'Mostrar senha'} placement="top">
                  <IconButtonLoginForm
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButtonLoginForm>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...formRegister('confirmPassword')}
          id="confirmPassword"
          label="Confirmar Senha"
          variant="filled"
          type={showConfirmPassword ? 'text' : 'password'}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'} placement="top">
                  <IconButtonLoginForm
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButtonLoginForm>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </LoginFormContainer>
      <Stack spacing={2}>
        <ButtonLoginForm type="submit" variant="contained">
          Registrar
        </ButtonLoginForm>
        <TitleRegister>
          Já tem uma conta?{' '}
          <MuiLink href="/login" sx={{ fontSize: '0.75rem' }} color="primary">
            Faça login
          </MuiLink>
        </TitleRegister>
      </Stack>
    </form>
  );
};

export default RegisterForm;
