import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import CustomerScore from '../../components/score/customer/CustomerScore';
import AdminScore from '../../components/score/admin/AdminScore';
import { Box } from '@mui/material';

const Score: React.FC = () => {
    const { user } = useAuth()

    if (user?.role === 'ROLE_ADMINISTRATOR' || user?.role === 'ROLE_ATTENDANT') {
        return <AdminScore />;
    } else if (user?.role === 'ROLE_CUSTOMER') {
        return <CustomerScore />;
    } else {
        return <Box>Unsupported role</Box>;
    }
};

export default Score;