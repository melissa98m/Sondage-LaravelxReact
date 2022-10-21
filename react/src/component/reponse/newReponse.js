import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input,  InputLabel,
 Select, MenuItem} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewReponse(props) {

    const [id, setID] = useState("");
    const [reponse, setReponse] = useState("");
    const [question, setQuestion] = useState({});
    const [newReponse, setShowNew] = useState(false);

    const [questions, setQuestions] = useState({})
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
    reponse: '' ,
    question: props.questionValue.id
    }});



    let newReponseForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/reponses/', {reponse , question})
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.reponse.data);
                let reponse = update(props.newValue.reponse, {$push: [{id : tab.id, reponse: tab.reponse , question: tab.question}]})
                console.log(reponse)
                props.handleDataChange(reponse);
                setToastMessage({message: "Reponse ajouté !", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
       <Button variant="contained" onClick={() => setShowNew(true)}>Repondre</Button>
        <Modal
            id="modal-type-container"
            hideBackdrop
            open={newReponse}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-type" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-type-title">{props.questionValue.value}</Typography>
                <form onSubmit={handleSubmit(newReponseForm)}>
                    <FormControl>
                        <Controller
                          name="reponse"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'reponse',
                                   {
                                       required: 'Ce champ est requis',
                                   }
                               )}
                               onChange={(e) => setReponse(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Votre réponse"
                               variant="standard"
                               value={reponse}
                            />
                          )}
                        />
                        {errors.reponse ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.reponse?.message}</Alert>
                        ) : ''}
                    </FormControl>
                </form>
                <Box className="action-button">
                                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                                        </Box>

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

export default NewReponse;