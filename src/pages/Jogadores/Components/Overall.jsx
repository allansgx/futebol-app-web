import { Box } from "@mui/material"
import styles from '../index.module.css'

export function Overall ({ value }) {
    const colors = {
        red: {
            color: '#d80000'
        },
        green: {
            color: '#00ae31'
        },
        yellow: {
            color: '#f9c200'
        }
    }

    const checkColorOverall = () => {
        if (value <= 70) {
            return colors.red
        }

        if (value >= 71 && value <= 79) {
            return colors.yellow
        }

        if (value >= 80) {
            return colors.green
        }
    }

    return (
        <Box>
            <Box
                className={styles.BoxOverall}
                sx={{...checkColorOverall()}}
            >
                {value}
            </Box>
        </Box>
    )
}