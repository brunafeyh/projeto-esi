import { FC } from "react"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Tooltip } from "@mui/material"
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

type MenuProps = {
    isCollapsed: boolean
}
export const MenuIcon: FC<MenuProps> = ({ isCollapsed }) => {
    if (isCollapsed) {
        return (
            <Tooltip title="Abrir Barra Lateral">
                <ArrowForwardIosIcon style={{ fontSize: 16 }} />
            </Tooltip>
        )
    }
    return (
        <Tooltip title="Colapsar Barra Lateral">
            <MenuOpenIcon style={{ fontSize: 24 }} />
        </Tooltip>)
}