import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewSondage(props) {

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [newSondage, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {question: ''}});

    let newSondageForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/sondages/', {name})
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, name: tab.name}]})
                props.handleDataChange(data);
                setName("");
                setToastMessage({message: "Question ajouté ! Vous pouvez en ajouter une autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
        <Modal
            id="modal-sondage-container"
            hideBackdrop
            open={newSondage}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-sondage-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-sondage" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-sondage-title">Nouvelle question dans le sondage</Typography>
                <form onSubmit={handleSubmit(newSondageForm)}>
                    <FormControl>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'name',
                                   {
                                       required: 'Ce champ est requis',

                                   }
                               )}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Nom du sondage"
                               variant="standard"
                               value={name}
                            />
                          )}
                        />
                        {errors.name ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                        ) : ''}
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
                </form>

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

export default NewSondage;