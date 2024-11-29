import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../../../services/api";
import { useSnackbar } from "notistack";
import AlertDialog from "../../../../components/AlertDialog";

export function ModalAddJogador ({ idTime, handleRecarregar, paises }) {
    const { enqueueSnackbar } = useSnackbar()
    const [nome, setNome] = useState('')
    const [posicao, setPosicao] = useState('ATA')
    const [overall, setOverall] = useState(50)
    const [pais, setPais] = useState('')
    const listPosicoes = ['ATA', 'PD', 'PE', 'MEI', 'MC', 'ME', 'MD', 'LD', 'LE', 'ZAG', 'GL']

    const limparTodosCampos = () => {
        setNome('')
        setPosicao('ATA')
        setOverall(0)
        setPais('')
    }

    const handleAddJogador = async () => {
        const data = {
            nome,
            overall: overall ? parseInt(overall) : null,
            posicao,
            foto: null,
            timeId: idTime,
            paisId: pais?.id
        }

        await api
            .post('/jogadores', data)
            .then(() => {
                enqueueSnackbar('Jogador adicionado com sucesso.', { variant: 'success' });
                handleRecarregar()
                limparTodosCampos()
            })
            .catch((error) => {
                enqueueSnackbar(
                    error?.response?.data?.message ?? 'Não foi possível adicionar o jogador.',
                    { variant: 'error' }
                );
            })
    }

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
            onConfirm={handleAddJogador}
            title="Adicionar jogador"
            fullWidth
            maxWidth='sm'
        >
            <Button
                variant="contained"
                sx={{ marginBottom: 2 }}
            >
                Adicionar jogador
            </Button>
        </AlertDialog>
    )
}