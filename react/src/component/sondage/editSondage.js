import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditSondage(props) {
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [oneSondage, setOneSondage] = useState("");
    const [editSondage, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {name: props.updateValue.name} });

    let editSondageForm = async () => {
        try {
            let updatedPark = {
                id: id ? id : parseInt(oneSondage.id),
                name: name ? name : oneSondage.name,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/sondages/" + oneSondage.id, {name})
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneSondage.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedPark}})
                props.handleDataChange(data, 'edit');
                setShowEdit(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}}
            onClick={() => {
                setShowEdit(true)
                setOneSondage({id: props.updateValue.id, name: props.updateValue.name})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-sondage-container"
            hideBackdrop
            open={editSondage}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-sondage-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-sondage" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-sondage-title">Modifier une question</Typography>
                <form onSubmit={handleSubmit(editSondageForm)}>
                    <FormControl>
                          <Controller
                              name="name"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name',
                                       {
                                           required: 'Ce champ est requis',
                                           minLength: {value: 5, message: 'Longueur minimale de 5 caract??res'}
                                       }
                                   )}
                                   onChange={(e) => setName(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name}
                                />
                              )}
                            />
                            {errors.name ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                            ) : ''}
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
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
export default EditSondage;