import React from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import styles from './index.module.css'

export function SelecaoTime () {
    const [paises, setPaises] = useState([])
    const [paisSelecionado, setPaisSelecionado] = useState(null)
    const [timeSelecionado, setTimeSelecionado] = useState(null)

    const handleNextPais = () => {        
        const indexPaisAtual = paises?.findIndex((pais) => pais?.id === paisSelecionado?.id)
        const proximoPais = paises.at(indexPaisAtual + 1);
        if (!proximoPais) {
            setPaisSelecionado(paises[0])
            setTimeSelecionado(paises[0]?.times[0] ?? null)
            return
        }

        setPaisSelecionado(proximoPais)
        setTimeSelecionado(proximoPais?.times[0] ?? null)
    }

    const handlePreviousPais = () => {        
        const indexPaisAtual = paises?.findIndex((pais) => pais?.id === paisSelecionado?.id)
        const proximoPais = paises.at(indexPaisAtual - 1);
        if (!proximoPais) {
            setPaisSelecionado(paises[0])
            setTimeSelecionado(paises[0]?.times[0] ?? null)
            return
        }

        setPaisSelecionado(proximoPais)
        setTimeSelecionado(proximoPais?.times[0] ?? null)
    }

    const handleNextTime = () => {        
        const indexTimeAtual = paisSelecionado?.times?.findIndex((time) => time?.id === timeSelecionado?.id)
        const proximoTime = paisSelecionado?.times?.at(indexTimeAtual + 1);
        if (!proximoTime) {
            setTimeSelecionado(paisSelecionado?.times[0] ?? null)
            return
        }

        setTimeSelecionado(proximoTime ?? null)
    }

    const handlePreviousTime = () => {        
        const indexTimeAtual = paisSelecionado?.times?.findIndex((time) => time?.id === timeSelecionado?.id)
        const proximoTime = paisSelecionado?.times?.at(indexTimeAtual - 1);
        if (!proximoTime) {
            setTimeSelecionado(paisSelecionado?.times[0] ?? null)
            return
        }

        setTimeSelecionado(proximoTime ?? null)
    }

    const handleNavigateToJogadores = () => {
        window.location.replace('/jogadores')
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
            <Box
                className={styles.BoxSelecionarPais}
                padding="16px 24px"
                display="flex"
            >
                <IconButton
                    className={styles.iconNextPrevious}
                    onClick={handlePreviousPais}
                >
                    <ArrowLeftIcon />
                </IconButton>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <Box fontSize="1.5rem">
                        {paisSelecionado?.nome ?? ''}
                    </Box>

                    <img
                        alt='Bandeira'
                        src={paisSelecionado?.foto ?? ''}
                        width="80px"
                        height='60px'
                    />
                </Box>

                <IconButton
                    className={styles.iconNextPrevious}
                    onClick={handleNextPais}
                >
                    <ArrowRightIcon />
                </IconButton>
            </Box>

            <Box
                className={styles.BoxSelecionarPais}
                display="flex"
                mt={3}
                padding="30px 24px 60px 24px"
            >
                <IconButton
                    className={styles.iconNextPrevious}
                    onClick={handlePreviousTime}
                >
                    <ArrowLeftIcon />
                </IconButton>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: 600,
                            fontSize: '2rem'
                        }}
                    >
                        {paisSelecionado && timeSelecionado
                            ? timeSelecionado?.nome
                            : ''
                        }
                    </Box>

                    <img
                        alt='Bandeira'
                        src={timeSelecionado?.foto ?? ''}
                        width="250px"
                        height="250px"
                    />
                </Box>

                <IconButton
                    className={styles.iconNextPrevious}
                    onClick={handleNextTime}
                >
                    <ArrowRightIcon />
                </IconButton>
            </Box>

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