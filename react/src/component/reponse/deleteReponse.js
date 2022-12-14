import {Box, Button, FormControl, Modal, Snackbar, Typography, Alert} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {DeleteForeverRounded} from "@mui/icons-material";
import axios from "axios";

function DeleteReponse(props) {

    const [oneReponse, setOneReponse] = useState("");
    const [delReponse, setShowDelete] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    let deleteReponse = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.delete('http://127.0.0.1:8000/api/reponses/' + oneReponse.id)
            if (res.status === 200) {
                const foundIndex = props.deleteValue.data.findIndex(x => x.id === oneReponse.id);
                let data = update(props.deleteValue.data, {$splice: [[foundIndex, 1]]})
                props.handleDataChange(data, 'delete');
                setShowDelete(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(<Box>
            <Button
                variant='contained'
                sx={{mx: 2}}
                onClick={ () => {
                    setShowDelete(true)
                    setOneReponse({id: props.deleteValue.id, reponse: props.deleteValue.reponse} )
                } }
            >
                <DeleteForeverRounded/>
            </Button>
            <Modal
                id="modal-type-container"
                hideBackdrop
                open={delReponse}
                onClose={() => setShowDelete(false)}
                aria-labelledby="delete-type-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-type" sx={{bgcolor: 'background.default'}}>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="delete-type-title">Supprimer un Reponse de
                        voiture</Typography>
                    <FormControl>
                        <Box>
                            ??tes vous sur de vouloir supprimer le Reponse : {oneReponse.reponse}?
                        </Box>
                        <Box className="action-button">
                            <Button sx={{m: 3}} type="submit" variant="contained" onClick={deleteReponse}>Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowDelete(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal>

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
        </Box>
    )
}

export default DeleteReponse