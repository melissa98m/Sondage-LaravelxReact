import {Box, Button, FormControl, Modal, Snackbar,
TextField, Typography, Alert , InputLabel , Select , MenuItem} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditQuestion(props) {
    const [id, setID] = useState("");
    const [value, setValue] = useState("");
    const [sondage, setSondage] = useState({});
    const [sondages, setSondages] = useState({})
    const [oneQuestion, setOneQuestion] = useState("");
    const [editQuestion, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
    value: props.updateValue.value,
    sondage: props.updateValue.sondage
    } });

    let editQuestionForm = async () => {
        try {
            let updatedPark = {
                id: id ? id : parseInt(oneQuestion.id),
                value: value ? value : oneQuestion.value,
                sondage: sondage ? sondage : oneQuestion.sondage
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/Questions/" + oneQuestion.id, {value , sondage})
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneQuestion.id);
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
           <Button color='secondary' variant='contained' sx={{mx: 2}}
                      onClick={ async () => {
                          await axios.get("http://127.0.0.1:8000/api/sondages/").then((actualData) => { setSondages(actualData.data.data) });
                          setShowEdit(true)
                          setOneQuestion({
                          id: props.updateValue.id,
                          value: props.updateValue.value ,
                          sondage: props.updateValue.sondage,})
                      }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-type-container"
            hideBackdrop
            open={editQuestion}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-type" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-type-title">Editer un Question de voiture</Typography>
                <form onSubmit={handleSubmit(editQuestionForm)}>
                    <FormControl>
                          <Controller
                              name="value"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'value',
                                       {
                                           required: 'Ce champ est requis',
                                           minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                       }
                                   )}
                                   onChange={(e) => setValue(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Question"
                                   variant="standard"
                                   defaultValue={value}
                                />
                              )}
                            />
                            {errors.value ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.value?.message}</Alert>
                            ) : ''}
                             <Controller
                              name="sondage"
                              control={control}
                               render={() => (
                                <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                <InputLabel id="category-select">sondage</InputLabel>
                                <Select
                                labelId="category-select"
                                id="category-select"
                                 defaultValue={props.updateValue.sondage.id}
                                 label="Sondage"
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
export default EditQuestion;