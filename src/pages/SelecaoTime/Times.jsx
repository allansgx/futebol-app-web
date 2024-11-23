import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import styles from './index.module.css'
import { SelecionarPais } from './Components/SelecionarPais'
import { SelecionarTime } from './Components/SelecionarTime'
import { useNavigate } from 'react-router-dom'

export function Times () {
    const navigate = useNavigate()
    const [paises, setPaises] = useState([])
    const [paisSelecionado, setPaisSelecionado] = useState(null)
    const [timeSelecionado, setTimeSelecionado] = useState(null)

    const handleChangePais = (direction) => {
        const indexPaisAtual = paises?.findIndex((pais) => pais?.id === paisSelecionado?.id);
        const novoIndex = (indexPaisAtual + direction + paises.length) % paises.length;
        const novoPais = paises[novoIndex];
    
        setPaisSelecionado(novoPais ?? null);
        setTimeSelecionado(novoPais?.times[0] ?? null);
    }

    const handleChangeTime = (direction) => {
        const indexTimeAtual = paisSelecionado?.times?.findIndex((time) => time?.id === timeSelecionado?.id)
        const novoIndex = (indexTimeAtual + direction + paisSelecionado?.times.length) % paisSelecionado?.times.length;
        const novoTime = paisSelecionado?.times[novoIndex];
        setTimeSelecionado(novoTime ?? null)
    }

    const handleNavigateToJogadores = () => {
        if (!timeSelecionado || !timeSelecionado?.id) return
        navigate(`/times/${timeSelecionado.id}`)
    }

    useEffect(() => {
        api
            .get('/paises')
            .then((response) => {
                const data = response?.data ?? []
                if (!data) return

                setPaises(data)
                setPaisSelecionado(data[0])
                setTimeSelecionado(data[0]?.times[0] ?? null)
            })
    }, [])

    return (
        <Box
            className="fade-in"
            display="flex"
            flexDirection="column"
        >
            <SelecionarPais
                handleChangePais={handleChangePais}
                paisSelecionado={paisSelecionado}
            />

            <SelecionarTime
                handleChangeTime={handleChangeTime}
                timeSelecionado={timeSelecionado}
            />

            <Box
                className={styles.BoxSelecionarPais}
                mt={3}
                p={3}
                textAlign="center"
                sx={{ cursor: 'pointer' }}
                onClick={handleNavigateToJogadores}
            >
                Avançar
            </Box>
        </Box>
    )
}