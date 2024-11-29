import { useEffect, useState } from "react"
import api from "../../services/api"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Grid2 } from "@mui/material"
import { useTable } from "../../hooks/useTable"
import { TablePaginated } from "../../components/TablePaginated"
import { useSnackbar } from 'notistack'
import { LinhaJogador } from "./Components/LinhaJogador"
import { ModalAddJogador } from "./Components/Modal/ModalAddJogador"

export function Jogadores() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [time, setTime] = useState(null)
    const [paises, setPaises] = useState([])
    const [recarregar, setRecarregar] = useState(false)

    const headers = [
        { nome: 'Nome', width: '40%' },
        { nome: 'Posição', width: '20%' },
        { nome: 'Overall', width: '20%' },
        { nome: 'Ações', width: '20%' }
    ]
    const table = useTable(headers, time?.jogadores ?? [])

    const handleRecarregar = () => setRecarregar(!recarregar)

    const handleNavigateToSelecaoTime = () => {
        navigate('/')
    }

    const handleDeleteJogador = (idJogador) => {
        api
            .delete(`/jogadores/${idJogador}`)
            .then(() => {
                enqueueSnackbar('Jogador deletado com sucesso.', { variant: 'success' });
                setRecarregar(!recarregar)
            })
            .catch(() => {
                enqueueSnackbar('Não foi possível deletar o jogador.', { variant: 'error' });
            })
    }

    useEffect(() => {
        if (!id) return

        api
            .get(`/times/${id}`)
            .then((response) => {
                setTime(response?.data ?? [])
            })
    }, [id, recarregar])

    useEffect(() => {
        api
            .get('/paises')
            .then((response) => {
                setPaises(response?.data ?? [])
            })
    }, [])

    return (
        <Grid2
            className="fade-in"
            alignItems="center"
            container
            width="100%"
        >
            <Grid2 size={{ md: 4, xs: 12 }}>
                <Box sx={{ fontWeight: 600, fontSize: '2rem' }} mb={3}>
                    {time?.nome}
                </Box>

                <Box mb={3}>
                    <img
                        alt="Time"
                        src={time?.foto}
                        width="200px"
                    />
                </Box>

                <Button onClick={handleNavigateToSelecaoTime} variant="contained">
                    Voltar
                </Button>
            </Grid2>

            <Grid2
                size={{ md: 8, xs: 12 }}
                p={5}
            >
                <Box textAlign="end">
                    <ModalAddJogador
                        idTime={time?.id}
                        handleRecarregar={handleRecarregar}
                        paises={paises}
                    />
                </Box>

                <TablePaginated table={table}>
                    {table?.paginatedRows?.map((item) => (
                        <LinhaJogador
                            key={item?.id}
                            item={item}
                            handleDeleteJogador={handleDeleteJogador}
                            handleRecarregar={handleRecarregar}
                            paises={paises}
                        />
                    ))}
                </TablePaginated>
            </Grid2>
        </Grid2>
    )
}