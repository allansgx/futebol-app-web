import { useEffect, useState } from "react"
import api from "../../services/api"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Chip, Grid2, TableCell, TableRow } from "@mui/material"
import { Overall } from "./Components/Overall"
import { useTable } from "../../hooks/useTable"
import { TablePaginated } from "../../components/TablePaginated"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconTooltip } from "../../components/IconTooltip"

export function Jogadores() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [time, setTime] = useState(null)

    const headers = [
        { nome: 'Nome', width: '40%' },
        { nome: 'Posição', width: '20%' },
        { nome: 'Overall', width: '20%' },
        { nome: 'Ações', width: '20%' }
    ]
    const table = useTable(headers, time?.jogadores ?? [])

    const handleNavigateToSelecaoTime = () => {
        navigate('/')
    }

    useEffect(() => {
        if (!id) return

        api
            .get(`/times/${id}`)
            .then((response) => {
                setTime(response?.data ?? [])
            })
    }, [id])

    return (
        <Grid2
            className="fade-in"
            alignItems="center"
            container
            width="100%"
        >
            <Grid2 size={4}>
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

                <Button onClick={handleNavigateToSelecaoTime}>
                    Voltar
                </Button>
            </Grid2>

            <Grid2
                size={8}
                p={5}
            >
                <TablePaginated table={table}>
                    {table?.paginatedRows?.map((item) => (
                        <TableRow key={item?.id}>
                            <TableCell>
                                {item?.nome}
                            </TableCell>

                            <TableCell>
                                <Chip label={item.posicao} sx={{ height: '25px' }}/>
                            </TableCell>

                            <TableCell>
                                <Overall value={item?.overall} />
                            </TableCell>

                            <TableCell>
                                <IconTooltip
                                    callback={() => console.log('Editar')}
                                    icon={<EditOutlinedIcon />}
                                    tooltip="Editar"
                                />

                                <IconTooltip
                                    callback={() => console.log('Excluir')}
                                    icon={<DeleteOutlinedIcon />}
                                    tooltip="Excluir"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TablePaginated>
            </Grid2>
        </Grid2>
    )
}