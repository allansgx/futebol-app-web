import { Box, IconButton } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import styles from '../index.module.css'

export function SelecionarTime ({ timeSelecionado, handleChangeTime }) {
    const handleNextTime = () => handleChangeTime(1);
    const handlePreviousTime = () => handleChangeTime(-1);

    return (
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
                    { timeSelecionado
                        ? timeSelecionado?.nome
                        : '' }
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
    )
}
