import {AppBar, Box, Link} from "@mui/material";
import {useEffect} from "react";
import '../../../assets/css/component/_partials/_footer.scss'

export function Footer() {

    useEffect(() => {
    }, [])

    return (
         <AppBar id="footer" position="fixed" color="primary" className='footer-container' sx={{ top: 'auto', bottom: 0, minHeight: "50px" }}>
             <Box>
                 Developped by
             </Box>
         </AppBar>

    )
}