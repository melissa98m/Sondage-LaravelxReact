
import React, {useEffect, useState} from "react";
import NewReponse from "./newReponse";
import axios from "axios";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Alert,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

const Questionnaire = () => {
const [data, setData] = useState(null); // array of data
  const [reponse, setReponse] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});


 const handleDataChange = async (dataChange, message) => {
        await setData(dataChange)
        if (message && message === 'edit'){
            setToastMessage({message: "Reponse modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Reponse supprimé !", severity: "success"});
            setShowToast(true);
        }
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/questions').then((actualData) => {
            actualData = actualData.data;
            console.log(actualData.data)
            setLoading(true)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);



    return <Container maxWidth="md" id="Question">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Questionnaire</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des Questions...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                                {data.map(({id, value , sondage}) => {
                                    return (
                                    <Box key={value+id} sx={{MarginTop: '5px'}}>
                                    <Typography variant='body2'>Sondage: {sondage.name}</Typography>
                                       <Box>{value}</Box>
                                       <NewReponse newValue={{reponse}} questionValue={{id , value}} handleDataChange={handleDataChange} />
                                       </Box>
                                    )
                                })}
                </Box>
            )}
        </Paper>

        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={() => setShowToast(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                {toastMessage.message}
            </Alert>
        </Snackbar>
    </Container>
}
export default Questionnaire;
