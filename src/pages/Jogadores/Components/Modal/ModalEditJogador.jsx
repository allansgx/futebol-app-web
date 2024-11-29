/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AlertDialog from "../../../../components/AlertDialog";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconTooltip } from "../../../../components/IconTooltip";
import { useSnackbar } from "notistack";
import api from "../../../../services/api";

export function ModalEditJogador ({ jogador, handleRecarregar, paises }) {
    const { enqueueSnackbar } = useSnackbar()
    const [nome, setNome] = useState('')
    const [posicao, setPosicao] = useState('ATA')
    const [overall, setOverall] = useState(50)
    const [pais, setPais] = useState('')
    const listPosicoes = ['ATA', 'PD', 'PE', 'MEI', 'MC', 'ME', 'MD', 'LD', 'LE', 'ZAG', 'GL']

    const handleEditJogador = async () => {
        const data = {
            nome,
            overall: overall ? parseInt(overall) : null,
            posicao,
            foto: null,
            timeId: jogador?.timeId,
            paisId: pais?.id
        }

        await api
            .patch(`/jogadores/${jogador?.id}`, data)
            .then(() => {
                enqueueSnackbar('Jogador atualizado com sucesso.', { variant: 'success' });
                handleRecarregar()
            })
            .catch((error) => {
                enqueueSnackbar(
                    error?.response?.data?.message ?? 'Não foi possível editar o jogador.',
                    { variant: 'error' }
                );
            })
    }

    useEffect(() => {
        if (!jogador) return

        setNome(jogador?.nome ?? '')
        setPosicao(jogador?.posicao ?? 'ATA')
        setOverall(jogador?.overall ?? 50)

        const paisJogador = paises?.find((paisOpt) => paisOpt?.id === jogador?.paisId)
        setPais(paisJogador)
    }, [jogador])

    return (
        <AlertDialog
            content={
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <TextField
                            label="Nome"
                            value={nome}
                            onChange={(evt) => setNome(evt?.target?.value)}
                            fullWidth
                        />
                    </Grid2>
        
                    <Grid2 size={{ md: 6, sm: 12 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Posição</InputLabel>
        
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={posicao}
                                label="Posição"
                                onChange={(evt) => setPosicao(evt?.target?.value)}
                            >
                                { listPosicoes?.map((posicao) => (
                                    <MenuItem
                                        key={posicao}
                                        value={posicao}
                                    >
                                        {posicao}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
        
                    <Grid2 size={{ md: 6, sm: 12 }}>
                        <TextField
                            label="Overall"
                            value={overall}
                            onChange={(evt) => setOverall(evt?.target?.value)}
                            fullWidth
                            slotProps={{ htmlInput: { maxLength: 3 } }}
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">País</InputLabel>
        
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pais}
                                label="País"
                                onChange={(evt) => setPais(evt?.target?.value)}
                            >
                                { paises?.map((pais) => (
                                    <MenuItem
                                        key={pais.id}
                                        value={pais}
                                    >
                                        {pais?.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                </Grid2>
            }
            onConfirm={handleEditJogador}
            title="Editar jogador"
            fullWidth
            maxWidth='sm'
        >
            <IconTooltip
                icon={<EditOutlinedIcon />}
                tooltip="Editar"
            />
        </AlertDialog>
    )
}