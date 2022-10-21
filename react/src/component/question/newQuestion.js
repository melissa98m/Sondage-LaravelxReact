import {Box, Button, FormControl,Select, Modal, Snackbar, TextField,
Typography, Alert, Input , InputLabel, MenuItem} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewQuestion(props) {

    const [id, setID] = useState("");
    const [ value , setValue] = useState("");
    const [sondages, setSondages] = useState({});
    const [sondage, setSondage] = useState({});
    const [newQuestion, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
    value: '' ,
    sondage: {}
    }});

    let reset = () => {
            setValue('');
            setSondage('');
        }

    let newQuestionForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/questions/', {value , sondage})
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, value: tab.value , sondage: tab.sondage}]})
                props.handleDataChange(data);
                reset();
                setToastMessage({message: "Question ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
       <Button variant="contained" onClick={ async () => {
                   await axios.get("http://127.0.0.1:8000/api/sondages/").then((actualData) => { setSondages(actualData.data.data) });
                   setShowNew(true)
                   }}>Ajouter</Button>
        <Modal
            id="modal-type-container"
            hideBackdrop
            open={newQuestion}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-type" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-type-title">Ajouter une Question</Typography>
                <form onSubmit={handleSubmit(newQuestionForm)}>
                    <FormControl>
                        <Controller
                          name="value"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'Question',
                                   {
                                       required: 'Ce champ est requis',
                                   }
                               )}
                               onChange={(e) => setValue(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Question"
                               variant="standard"
                               value={value}
                            />
                          )}
                        />
                        {errors.value ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.value?.message}</Alert>
                        ) : ''}
                        </FormControl>
                        <Controller
                        name="sondage"
                        control={control}
                        render={() => (
                        <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                         <InputLabel id="category-select">Question</InputLabel>
                         <Select
                          labelId="question-select"
                           id="question-select"
                            label="Question"
                             onChange={(e) => setSondage(e.target.value)}
                              sx={{height: 50}}
                              variant="outlined"
                               >
                                {sondages.map((sondage) => {
                                return(
                                 <MenuItem key={sondage.id} value={sondage.id}>{sondage.name}</MenuItem>
                                  )
                                   })}
                                   </Select>
                                   </FormControl>
                                    )}
                                  />
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                        </Box>
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

export default NewQuestion;