import React, { useState } from "react";
import { Box, Grid, Select, FilledInput, Dialog, MenuItem, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontsize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: "pointer",
    

        "&:hover" : {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        },
    },

    included:{
        backgroundColor: theme.palette.secondary.main,
            color: "#fff",
    }
   
}));

const initState = {
    title: "",
    type: "Full Time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],

}

export default (props) => {
    const[loading, setLoading] = useState(false);

    const [jobDetails, setJobDetails] = useState(initState);
    



    const handleChange = e => {
        e.persist();
        setJobDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value}));
    };

    const addRemoveSkill = skill =>  jobDetails.skills.includes(skill)
    ?  setJobDetails(oldState => ({ ...oldState, skills: oldState.skills.filter((s) => s != skill),}))

    : setJobDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill),}));

    const handleSubmit= async () => {
        for (const field in jobDetails) {
            if( typeof jobDetails[field] === "string" && !jobDetails[field]) return;
        }
        if (!jobDetails.skills.length) return;
        return console.log("validated");
       setLoading(true);
        await props.postJob(jobDetails);
        closeModal();

    };
    const closeModal = () => {
          setJobDetails(initState)
          setLoading(false);
          props.closeModal();
    };

    const classes = useStyles();

    const skills = [
        "Fluent-English",
        "Disciplined & professional",
        "strong communicator",
        "Well-Experienced",
        "Leadership qualities",

        
    ];

     
    return (

        <Dialog open={props.newJobModal}
         fullWidth>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                Post Job
                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    < FilledInput
                    onChange={handleChange}
                    autoComplete="off"
                    name="title"
                    value={jobDetails.title}
                    placeholder="Job Title *" disableUnderline fullWidth />

                </Grid>
                <Grid item xs={6}>
                <Select 
                name="type"
              value={jobDetails.type}
              onChange={handleChange}

                fullWidth disableUnderline variant="filled" >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
            </Select>


                </Grid>
                <Grid item xs={6}>
                    <FilledInput
                      name="companyName"
                     value={jobDetails.companyName}
                     onChange={handleChange}

                    autoComplete="off"
                    placeholder="Shop/Industry Name *" disableUnderline fullWidth />

                </Grid>
                <Grid item xs={6}>
                    <FilledInput 
                  name="comapnyUrl"
                  value={jobDetails.companyURL}
                  onChange={handleChange}

                    autoComplete="off"
                    placeholder="Shop/Industry URL *" disableUnderline fullWidth />

                </Grid>
                <Grid item xs={6}>
                <Select 
                   name="location"
                  value={jobDetails.location}
                  onChange={handleChange}

                fullWidth disableUnderline variant="filled" >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-office">In-office</MenuItem>
            </Select>

                </Grid>
                <Grid item xs={6}>
                    <FilledInput 
                        name="link"
                        value={jobDetails.link}
                        onChange={handleChange}

                    autoComplete="off"
                    placeholder="Job Link " disableUnderline fullWidth />

                </Grid>
                <Grid item xs={12}>
                    <FilledInput
                        name="description"
                       value={jobDetails.description}
                       onChange={handleChange}

                    autoComplete="off"
                    placeholder="Job description" disableUnderline fullWidth multiline rows={4} />

                </Grid>






            </Grid>
            <Box mt={2}>
                <Typography>Skills*</Typography>
                <Box display="flex">
                    {skills.map((skill) => (<Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included
                    }`} key={skill}>{skill}</Box>))}
                </Box>

            </Box>
        </DialogContent>
        <DialogActions>
            <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">*Required Fields*</Typography>
                <Button onClick={handleSubmit} variant="contained" disableElevation color="primary" disabled={loading}>
                {loading ? (
                <CircularProgress color="secondary" size={22} />
                ) : (
                "Post Job"
                )}
                    
              </Button>
            </Box>
        </DialogActions>
        </Dialog>
    );
};
