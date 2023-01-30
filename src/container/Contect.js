import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { Construction } from '@mui/icons-material';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


function Contect(props) {

    const hendelDelet = (values) => {
        console.log(values);
        console.log(values.id);
        let localData = JSON.parse(localStorage.getItem("contect"));
        let dData = localData.filter((l) => l.id !== values.id);
        localStorage.setItem("contect", JSON.stringify(dData));
        // setCondata(dData);
        console.log(dData);
    }

    // State
    const [open, setOpen] = React.useState(false);
    const [conData, setCondata] = useState([])
    const [dopen, setDopen] = React.useState(false);

    const handleDclickopen = () => {
        setDopen(true);
    };

    const handleDclose = () => {
        setDopen(false);
    };


    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("contect"));

        if (localData !== null) {
            // localStorage.setItem("contect" , JSON.stringify(localData))   // aa no aave
            setCondata(localData)
        }
    })


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 70 },
        {
            field: 'Action', headerName: 'Action', with: 70,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="delete" sx={{ border: "1px solid black" }} onClick={() => {hendelDelet(params.row);handleDclickopen()} }>
                            <DeleteIcon />
                             {/* { setDid(params.row.id); setDOpen(true) }}  */}
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ border: "1px solid blue" }}>
                            <ModeEditIcon />
                        </IconButton>
                    </>
                )
            }
        }
        // { field: 'firstName', headerName: 'First name', width: 130 },
        // { field: 'lastName', headerName: 'Last name', width: 130 },
    ];


    // Methode
    const handleDialogClickOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    // Schema
    let schema = yup.object().shape({
        name: yup.string().required('please enter name')
    });

    //Formik Object
    const formikobj = useFormik({
        initialValues: {
            name: ''
        },

        validationSchema: schema,
        onSubmit: values => {
            console.log(values);

            contectData(values);
            setOpen(false);
        },
    });
    const { handleBlur, handleSubmit, handleChange, errors, touched, setFieldTouched, values, setValues, setFieldValue } = formikobj;
    // console.log(errors, touched);

    const contectData = (values) => {
        console.log(values);

        let localData = JSON.parse(localStorage.getItem("contect"));

        let idData = Math.round(Math.random() * 1000);
        let fidData = { ...values, id: idData }


        // console.log("sid" + idData);
        // console.log(localData);

        if (localData !== null) {
            localData.push(fidData)
            localStorage.setItem("contect", JSON.stringify(localData))
            setCondata(localData)
        } else {
            localStorage.setItem("contect", JSON.stringify([fidData]))
            setCondata(fidData)
        }
        console.log(localData);
    }

    return (
        <div>
            <h1>Contect</h1>
            <Divider />

            {/* Form dialog box */}
            <div>
                <Button
                    variant="outlined"
                    onClick={handleDialogClickOpen}
                    sx={{ top: "10px" }}
                >
                    Add Details
                </Button>


                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>Contect Form</DialogTitle>
                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <DialogContentText>
                                    Enter Basic Details.
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                // onChange={e => { setFieldTouched("name"); handleChange(e) }}
                                />

                                {errors.name !== '' && touched.name ? <p className='form-error'>{errors.name}</p> : null}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>

                {/* Table */}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={conData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

                {/* Delet Alert */}
                <div>
                    <Button variant="outlined" onClick={handleDclickopen}>
                        Open alert dialog
                    </Button>
                    <Dialog
                        open={dopen}
                        onClose={handleDclose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Use Google's location service?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This means sending anonymous
                                location data to Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDclose}>Disagree</Button>
                            <Button onClick={handleDclose} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </div>

        </div>
    );
}

export default Contect;