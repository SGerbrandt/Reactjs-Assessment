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

function MainGrid({jsonData}) {
    const [currPartitionData, setCurrPartitionData] = useState({});
    const [open, setOpen] = useState(false);

    const handleClickOpen = (event, partitionData) => {
        setOpen(true);
        setCurrPartitionData(partitionData);
    }
    const handleClose = () => {
        setOpen(false);
        setCurrPartitionData({});
    }

    return (
        <Box sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
            <Grid 
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                columns={2}
            >
                {Array.from(jsonData.value || []).map((partition, index) => (
                    <Grid key={index} xs={0.5}>
                        <Item fullWidth={true} onClick={event => handleClickOpen(event, partition)}>
                            <StorageIcon sx={{ fontSize: "80px" }} />
                            <Typography fontWeight={'Bold'} variant="h5" component={"h3"} > {partition.name} </Typography>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <DataDialog open={open} handleClose={handleClose} currPartitionData={currPartitionData} />
        </Box>
    )
};

export default MainGrid;