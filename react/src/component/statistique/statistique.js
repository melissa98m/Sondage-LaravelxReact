import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Typography,
    Alert
} from "@mui/material";
import PieChart from "../PieChart";
import axios from "axios";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

function Statistique() {

    document.title = 'Statistique';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [sexes , setSexes] = useState([]); // array
    const [ages , setAges] = useState([]); // array

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/pourcent').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            getSexes()
            getAges()
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
     let getSexes = async () => {
                await axios.get("http://127.0.0.1:8000/api/pourcent").then((actualData) => {
                    let array = [] ;
                    actualData.data.data.map((data) => {
                        if (data.question === 1 ) {
                            array = [...array , data]
                        }
                    })
                    setSexes(array);
                });
        }

        let getAges = async () => {
                        await axios.get("http://127.0.0.1:8000/api/pourcent").then((actualData) => {
                            let array = [] ;
                            actualData.data.data.map((data) => {
                                if (data.question === 2 ) {
                                    array = [...array , data]
                                }
                            })
                            setAges(array);
                        });
                }

const totalSexe = sexes.reduce((a,v) =>  a = a + v.nbrReponse , 0 )
const totalAge = ages.reduce((a,v) =>  a = a + v.nbrReponse , 0 )

 //const { sexes: chartData } = this.state;

    return <Container maxWidth="md" id="Reponse">
    <Box sx={{ width: 700 }}>

          </Box>
          <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
                      <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Statistiques</Typography>
                      {loading ? (
                          <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des Statistiques...</Typography>
                      ) : (
                          <Box sx={{ maxWidth: '100%' }}>
                          <Typography variant="h4">Question 1</Typography>
                                          {sexes.map(({reponse , nbrReponse}) => {

                                          const percentSexe = (nbrReponse * 100) / totalSexe;
                                              return (
                                              <Box key={reponse} sx={{MarginTop: '5px'}}>
                                              <Typography variant='body2'>Reponse: {reponse}</Typography>
                                              <Typography variant='body'>Nombre de reponse: {nbrReponse}</Typography>
                                              <Typography variant='body'>Soit: {percentSexe}%</Typography>
                                                 </Box>
                                              )
                                          }
                                          )}
                                          <Box>Total de reponse: {totalSexe}</Box>



                                            <Typography variant="h4">Question 2</Typography>
                                             {ages.map(({reponse , nbrReponse}) => {
                                              const percentAge = (nbrReponse * 100) / totalAge;
                                              return (
                                               <Box key={reponse} sx={{MarginTop: '5px'}}>
                                               <Typography variant='body2'>Reponse: {reponse}</Typography>
                                               <Typography variant='body'>Nombre de reponse: {nbrReponse}</Typography>
                                                <Box variant='body'>Soit: {percentAge}%</Box>
                                                </Box>
                                                 )
                                                  })}
                                                  <Box>Total de reponse: {totalAge}</Box>

                          </Box>
                      )}
                  </Paper>

    </Container>
}

export default Statistique;