import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';

//MUI Components
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

//MUI Icons
import StorageIcon from '@mui/icons-material/Storage';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//Locals
import DriveGrid from "./DriveGrid";

const Transition =  forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataDialog({ open, handleClose, currPartitionData, fullScreen=true }) {
    const [partitionData, setCurrPartitionData] = useState(currPartitionData)
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        const formattedData = [];
        function walkData(obj, nestedName = null, nestedData=[]) {
        var nestedDataArr = nestedData;
            for (var elem in obj) {
                if (obj[elem] instanceof Object) {
                    if(elem !== "drives") {
                        walkData(obj[elem], elem, nestedDataArr)
                        formattedData.push(createNestedRow(elem, true, nestedDataArr))
                    }

                } else {
                    if(nestedName === null) {
                        formattedData.push(createRow(elem, obj[elem]));
                    } else {
                        nestedDataArr.push(createRow(elem, obj[elem]))
                    }
                }
            }
        };

        setCurrPartitionData(currPartitionData);
        walkData(partitionData);
        setRowData(formattedData)
    }, [currPartitionData, partitionData])

    function createRow(name, value) {
        return {
            name,
            value,
        };
    };

    function createNestedRow(name, isNested, nestedData) {
        return {
            name,
            isNested,
            nestedData,
        };
    };

    function displayNodeValue (value) {
        if (value === true) {
            return <CancelIcon color="error" />
        } else if (value === false) {
            return <CheckCircleIcon color="success" />
        } else {
            return value.toString()
        }
    };

    function Row(props) {
        const { row } = props;

        return (
            <React.Fragment>
                <TableRow sx={{'& > *': {borderBottom: 'unset'} }}>
                    <TableCell />
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="left">
                        {displayNodeValue(row.value)}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    function NestedRow(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell/>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Table size="small" areia-label="nested values">
                                    <TableBody>
                                        {row.nestedData?.map((nestedRow) => (
                                            <TableRow key={nestedRow.name}>
                                                <TableCell />
                                                <TableCell component="th" scope="row">
                                                    {nestedRow.name}
                                                </TableCell>
                                                <TableCell>
                                                    {displayNodeValue(nestedRow.value)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    Row.propTypes = {
        row: PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ]).isRequired,
        }).isRequired
    };

    NestedRow.propTypes = {
        row: PropTypes.shape({
            name: PropTypes.string.isRequired,
            isNested: PropTypes.bool.isRequired,
            nestedData: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                        PropTypes.bool, 
                    ])
                }),
            ).isRequired,
        }).isRequired,
    };



    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{alignContent: 'center', justifyContent:'center'}}>
                    <StorageIcon/>
                    {
                        Object.keys(partitionData).length !== 0 &&
                        <Typography sx={{ ml: 2, mt: 0.3, flexGrow: 1 }} fontWeight={'bold'} variant="h6" component="div">
                            {partitionData.name}
                        </Typography>
                    }
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{width: "100%"}} >
                <div style={{display: "flex", height: '100%'}}>
                    <div style={{flexGrow: 1}}>
                        <TableContainer component={Paper}>
                            <Table area-label="semi collapsable table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell align="left" fontWeight="bold">Name</TableCell>
                                        <TableCell align="left">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowData?.map((row) => {
                                        if(row.isNested !== undefined && row.isNested === true) {
                                        return <NestedRow key={row.name} row={row} />;
                                        } else {
                                            return <Row key={row.name} row={row} />;
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <DriveGrid driveData={partitionData.drives}/>
        </Dialog>
    );
}