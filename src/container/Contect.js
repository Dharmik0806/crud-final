import React, { useState } from 'react';
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


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];
      
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



function Contect(props) {

    // State
    const [open, setOpen] = React.useState(false);
    const [conData, setCondata] = useState([])


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
       let fidData = {...values ,id : idData}

       
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
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </div>

        </div>
    );
}

export default Contect;