import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { TitlePageSettings } from './styles';
import { PageLayout } from '../../layouts/page-layout';

const Settings: FC = () => {
    const [pratos, setPratos] = useState<any[]>([]);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [estatisticas, setEstatisticas] = useState<any>({});
    const [ingredientes, setIngredientes] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const apiBaseUrl = 'http://localhost:3000'; // URL base da API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pratosResponse, pedidosResponse, estatisticasResponse, ingredientesResponse, categoriasResponse] = await Promise.all([
                    axios.get(`${apiBaseUrl}/pratos`),
                    axios.get(`${apiBaseUrl}/pedidos`),
                    axios.get(`${apiBaseUrl}/estatisticas`),
                    axios.get(`${apiBaseUrl}/ingredientes`),
                    axios.get(`${apiBaseUrl}/categorias`)
                ]);

                setPratos(pratosResponse.data);
                setPedidos(pedidosResponse.data);
                setEstatisticas(estatisticasResponse.data);
                setIngredientes(ingredientesResponse.data);
                setCategorias(categoriasResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <PageLayout title="Settings">
            <TitlePageSettings>Configurações</TitlePageSettings>
            <div>
                <h2>Pratos</h2>
                <pre>{JSON.stringify(pratos, null, 2)}</pre>
                <h2>Pedidos</h2>
                <pre>{JSON.stringify(pedidos, null, 2)}</pre>
                <h2>Estatísticas</h2>
                <pre>{JSON.stringify(estatisticas, null, 2)}</pre>
                <h2>Ingredientes</h2>
                <pre>{JSON.stringify(ingredientes, null, 2)}</pre>
                <h2>Categorias</h2>
                <pre>{JSON.stringify(categorias, null, 2)}</pre>
            </div>
        </PageLayout>
    );
};

export default Settings;
