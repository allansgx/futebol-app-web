import { Box, IconButton } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import styles from '../index.module.css'

export function SelecionarPais ({ paisSelecionado,  handleChangePais }) {
    const handleNextPais = () => handleChangePais(1);
    const handlePreviousPais = () => handleChangePais(-1);

    return (
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
    )
}
