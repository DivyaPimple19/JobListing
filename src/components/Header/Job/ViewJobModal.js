import React from "react";
import { Box, Grid, Select, FilledInput, Dialog, MenuItem, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon} from "@material-ui/icons";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
    info:{
        '& > *' : {
            margin: '4px'
        },
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontsize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        },
   
   
}));

export default props => {
 const classes = useStyles();
    return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
               <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            {props.job.title} @ {props.job.companyName}
                <IconButton onClick={props.closeModal}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle> 
        <DialogContent>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">Posted On:</Typography>
                <Typography variant="body2">{props.job.postedOn && format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}</Typography>

                    </Box>
            </Box>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">Job type:</Typography>
                <Typography variant="body2">{props.job.type}</Typography>

                    </Box>
            </Box>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">job location:</Typography>
                <Typography variant="body2">{props.job.location}</Typography>

                    </Box>
            </Box>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">Job description:</Typography>
                <Typography variant="body2">{props.job.description}</Typography>

                    </Box>
            </Box>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">companyName:</Typography>
                <Typography variant="body2">{props.job.companyName}</Typography>

                    </Box>
                    <Box className={classes.info} display="flex">
                    <Typography variant="body3">companyEmail:</Typography>
                <Typography variant="body2">{props.job.companyEmail}</Typography>

                    </Box>

            </Box>
            
                <Box className={classes.info} display="flex">
                    <Typography variant="body3">companyUrl:</Typography>
                <Typography variant="body2">{props.job.companyUrl}</Typography>

                    
            </Box>
            
                <Box ml={0.5}>
                    <Typography variant="body3">Skills:</Typography>
                <Grid container alignItems="center">
                    {props.job.skills && 
                       props.job.skills.map((skill) => (
                           <Grid item key={skill} className={classes.skillChip}>
                               {skill}
                               </Grid>
                       ))}
                </Grid>

                    </Box>
            




        </DialogContent>

            <DialogActions>
                <Button variant="outlined" component="a" href={props.job.link} target="_blank">Apply</Button>
            </DialogActions>
    
    </Dialog>
);
};
