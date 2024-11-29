import { Box, Chip, TableCell, TableRow } from "@mui/material"
import { Overall } from "../Components/Overall"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconTooltip } from "../../../components/IconTooltip"
import AlertDialog from "../../../components/AlertDialog"
import { ModalEditJogador } from "./Modal/ModalEditJogador"

export function LinhaJogador ({ item, handleDeleteJogador, handleRecarregar, paises }) {
    return (
        <TableRow key={item?.id}>
            <TableCell>
                <Box display="flex" alignItems="center" gap="10px">
                    <img
                        alt="País"
                        src={item?.pais?.foto}
                        width="25px"
                    />
                    
                    {item?.nome}
                </Box>
            </TableCell>

            <TableCell>
                <Chip label={item.posicao} sx={{ height: '25px' }}/>
            </TableCell>

            <TableCell>
                <Overall value={item?.overall} />
            </TableCell>

            <TableCell>
                <Box display="flex">
                    <ModalEditJogador
                        jogador={item}
                        handleRecarregar={handleRecarregar}
                        paises={paises}
                    />

                    <AlertDialog
                        onConfirm={() => handleDeleteJogador(item.id)}
                        description="Você tem certeza que deseja excluir este jogador?"
                        title="Excluir"
                    >
                        <IconTooltip
                            icon={<DeleteOutlinedIcon />}
                            tooltip="Excluir"
                        />
                    </AlertDialog>
                </Box>
            </TableCell>
        </TableRow>
    )
}