import { useState } from 'react';

//MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

//MUI Icons
import StorageIcon from '@mui/icons-material/Storage';

//MUI Styles
import { experimentalStyled as styled } from '@mui/material/styles';

//Locals
import DataDialog from './DataDialog';

const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexDirection: 'column',
}));

export default function DriveGrid({driveData}) {
    const [currDriveData, setCurrDriveData] = useState({});
    const [open, setOpen] = useState(false);

    const handleClickOpen = (event, driveData) => {
        setOpen(true);
        setCurrDriveData(driveData);
    }
    const handleClose = () => {
        setOpen(false);
        setCurrDriveData({});
    }

    function checkIfPhysicalDrive (drive) {
        if (drive.physicalDrive !== undefined) {
            return (
            <Item fullWidth={true} onClick={event => handleClickOpen(event, drive)}>
                <StorageIcon sx={{ fontSize: "40px"}} color="success" />
                <Typography fontWeight={'Bold'} component={"h5"} > Physical Drive </Typography>
            </Item>
            )
        }

        return (
            <Item fullWidth={true} onClick={event => handleClickOpen(event, drive)}>
                <StorageIcon sx={{ fontSize: "40px" }} />
                <Typography fontWeight={'Bold'} component={"h5"} > {drive.partition} </Typography>
            </Item>
        )
    };

    return (
        <Box sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                margin: "auto",
                overflow: "hidden",
                overflowY: "scroll",
            }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                columns={2}
            >
                {Array.from(driveData || []).map((drive, index) => (
                    <Grid key={index} xs={1}>
                        {checkIfPhysicalDrive(drive)}
                        
                    </Grid>
                ))}
            </Grid>
            <DataDialog open={open} handleClose={handleClose} currPartitionData={currDriveData} fullScreen={false} />
        </Box>
    )
};