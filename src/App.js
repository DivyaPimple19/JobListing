import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Grid, CircularProgress, Button } from '@material-ui/core';
import theme from './theme/theme';
import Header from './components/Header/';
import SearchBar from './components/Header/SearchBar';
import JobCard from './components/Header/Job/JobCard';
import NewJobModal from './components/Header/Job/NewJobModal';
import { firestore, app } from './firebase/config'
import { Close as CloseIcon } from '@material-ui/icons'

export default () => {
   const[jobs, setJobs] = useState([]);
   const[loading, setLoading] = useState(true);
   const[customSearch, setCustomSearch] = useState(false);

   const [newJobModal, setNewJobModal] = useState(false)

   const fetchJobs = async () => {
       setLoading(true);
       const req = await firestore.collection('Jobs').orderBy('postedOn', 'desc').get();
       const tempJobs = req.docs.map((job) => ({ ...job.data() , id: job.id , postedOn: job.data().postedOn.toDate()}));
       setJobs(tempJobs);
       setLoading(false);
   };
   const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore.collection('Jobs').orderBy('postedOn', 'desc').where("location", ""=="", jobSearch.location).where("location", "==", jobSearch.type)
    .get();
    const tempJobs = req.docs.map((job) => ({ ...job.data() , id: job.id , postedOn: job.data().postedOn.toDate()}));
    setJobs(tempJobs);
    setLoading(false);

   }

   const postJob = async jobDetails => {
    await firestore.collection('Jobs').add({
        ...jobDetails,
        postedOn: app.firestore.FieldValue.serverTimestamp()
    });
      fetchJobs();
   };
   
   useEffect (() => {
       fetchJobs();
   },[]);
    return ( 
    <ThemeProvider theme={theme}>
       <Header openNewJobModal={() => setNewJobModal(true)} />
       <NewJobModal closeModal={() => setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob} />
       <Box mb={5}>
       <Grid container justify="center">
           <Grid item xs={10}>
               <SearchBar fetchJobsCustom={fetchJobsCustom} />


               {

                   loading ? (
                   <Box display="flex" justifyContent="center">
                       <CircularProgress />
                       </Box>
                )  : (
                    <>
                    {customSearch && 
                   ( <Box>
                   <Button>
                   <CloseIcon size={20} />
                   Custom Search
                   </Button>
                    </Box>
                   )}
                     { jobs.map((job) => (<JobCard key={job.id} {...job} />
                     ))}
                    
                      </>
                      )}
                      
    
                   
               

               
                        


    </Grid>
       </Grid>
       </Box>
    </ThemeProvider>
    );
};
