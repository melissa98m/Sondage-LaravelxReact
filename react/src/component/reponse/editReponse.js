import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert
,InputLabel , MenuItem , Select} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditType(props) {
    const [id, setID] = useState("");
    const [reponse, setReponse] = useState("");
    const [question, setQuestion] = useState({});
    const [oneReponse, setOneReponse] = useState("");
    const [questions, setQuestions] = useState({});
    const [editReponse, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
    reponse: props.updateValue.reponse,
    question: props.updateValue.question
    } });

    let editReponseForm = async () => {
        try {
            let updatedReponse = {
                id: id ? id : parseInt(oneType.id),
               reponse: reponse ? reponse : oneReponse.reponse,
               question: question ? question : oneReponse.question
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/reponses/" + oneReponse.id, {reponse , question})
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneType.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedReponse}})
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
                setOneType({id: props.updateValue.id, name: props.updateValue.name})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-type-container"
            hideBackdrop
            open={editType}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-type" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-type-title">Editer un type de voiture</Typography>
                <form onSubmit={handleSubmit(editTypeForm)}>
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
                                           minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
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
                            <Controller
                                    name="category_id"
                                    control={control}
                                    render={() => (
                                     <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                     <InputLabel id="category-select">Categorie</InputLabel>
                                       <Select
                                        labelId="category-select"
                                        id="category-select"
                                        defaultValue={props.updateValue.category.id}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                         >
                                           {categories.map((category) => {
                                               return(
                                                 <MenuItem key={category.id} value={category.id}>{category.name_category}</MenuItem>
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
export default EditType;