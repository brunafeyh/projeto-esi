import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import CustomerScore from '../../components/score/customer/CustomerScore';
import AdminScore from '../../components/score/admin/AdminScore';
import { Box } from '@mui/material';
import { ContainerPontuation } from './admin/styles';

const Score: React.FC = () => {
    const { user } = useAuth()

    if (user?.role === 'ROLE_ADMINISTRATOR' || user?.role === 'ROLE_ATTENDANT') {
        return <AdminScore />;
    } else if (user?.role === 'ROLE_CUSTOMER') {
        return <CustomerScore cpf={user.cpf} />;
    } else {
        return <ContainerPontuation><Box>Para ver a sua pontuação por favor faça login</Box></ContainerPontuation>;
    }
};

export default Score;