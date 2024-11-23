import { IconButton, Tooltip } from "@mui/material";

export function IconTooltip ({ callback, tooltip, icon }) {
    return (
        <IconButton onClick={callback}>
            { tooltip
                ? (
                    <Tooltip title={tooltip}>
                        {icon ?? ''}
                    </Tooltip>
                )
                : icon
            }
        </IconButton>
    )
}