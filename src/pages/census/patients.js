import { useNavigate } from "react-router-dom";
import ReactDataTable from 'react-data-table-component'
import AddPatient from "../../components/census/AddPatient";
import { useEffect, useState } from "react";
import '../../css/addPatient.css'
import EditPatient from "../../components/census/EditPatient";

function Patients({ idToken}) {
    const [allPatients, setAllPatients] = useState([])
    const [isOpenAddPatient, setIsOpenAddPatient] = useState(false)
    const [isOpenEdit, setIsOpenEdit]=useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    //data send edit
    const [name, setName] = useState('')
    const [ssn, setSsn] = useState(null)
    //const [filteredData, setFilteredData] = useState(allPatients);

    const navigate = useNavigate();

    useEffect(() => {
        if (idToken) {
            requestAllPatients(idToken)
        }
    })

    useEffect(() => {
       // const results = allPatients.filter(item => {
           // const combinedName = `${item.Name} ${item.LastName}`.toLowerCase();
            //return combinedName.includes(searchTerm.toLowerCase());
      // });
       // setFilteredData(results);
    }, [searchTerm, allPatients]);






    const handleOpenAddPatient = () => {
        setIsOpenAddPatient(true)
    }
    const handleOpenEditPatient=(Name,SSN)=>{
        setName(Name)
        setSsn(SSN)
        setIsOpenEdit(true)
    }

    const handleCloseEditPatient=()=>{
        setIsOpenEdit(false)
    }
    const handleCloseAddPatient = () => {
        setIsOpenAddPatient(false)
    }


    //ALL PATIENTS
    const requestAllPatients = async (idToken) => {
        await fetch('http://localhost:8000/api/census/patient', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAllPatients(data.Items)
               
            })
            .catch((err) => console.error('Error:', err));
    }
    //DELETE PATIENT
    const handleDeletePatient = async (idToken, Name, SSN) => {

        await fetch('http://localhost:8000/api/census/patient/delete', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Name": Name,
                "SSN": SSN
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log(data)
                }
            })
            .catch((err) => console.error('Error:', err));
    }

    const columns = [{
        name: 'Name',
        selector: row => row.Name
    },
    {
        name: 'Last Name',
        selector: row => row.LastName
    },
    {
        name: 'Age',
        selector: row => row.Age
    },
    {
        name: 'SSN',
        selector: row => row.SSN
    },
    {
        name: 'Action',
        selector: row => (<div>
            <button className='btn btn-danger' onClick={() => {
                handleDeletePatient(idToken, row.Name, row.SSN)
                allPatients.filter(patients => patients.Name !== row.Name)
            }}>Delete</button>
            <button className="btn btn-info mx-2" onClick={()=>{handleOpenEditPatient(row.Name,row.SSN)}}>Edit</button>
        </div>)
    }]

    return (
        <div>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <button type="button" class="btn btn-primary" onClick={handleOpenAddPatient}>Add Patient</button>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                            <button class="btn btn-outline-success">Search</button>
                    </form>
                </div>
            </nav>
            <div className="container-principal-addPatients">
                <AddPatient isOpen={isOpenAddPatient} handleCloseAddPatient={handleCloseAddPatient} idToken={idToken} />
                <EditPatient Name={name} SSN={ssn} isOpenEdit={isOpenEdit} handleCloseEditPatient={handleCloseEditPatient} idToken={idToken}/>
            </div>
            <ReactDataTable
                columns={columns}
                data={allPatients}
                selectableRows
                pagination
                fixedHeader
            />

        </div>
    )
}
export default Patients