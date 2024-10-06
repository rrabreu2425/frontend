import {useState } from 'react'
import '../../css/addPatient.css'

function AddPatient({ isOpen, handleCloseAddPatient, idToken }) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(null)
    const [ssn, setSsn] = useState(null)
    const [error, setError] = useState('')


    const handleSave = async (e) => {
        e.preventDefault();
        // all is valid
        let isOk = true;
        if (!name) {
            setError('The input Name is requeried')
            isOk = false
        }
        else {
            setError('')
        }
        if (!lastName) {
            setError('The input Last Name is requeried')
            isOk = false
        }
        else {
            setError('')
        }
        if (!age) {
            setError('The input Age is requeried')
            isOk = false
        }
        else {
            setError('')
        }
        if (!ssn) {
            setError('The input SSN is requeried')
            isOk = false
        }
        else {
            setError('')
        }
        if (!isOk) return

        const params = {
            SSN: Number(ssn),
            Name: name,
            LastName: lastName,
            Age: age
        }


        try {
            const response = await fetch('http://localhost:8000/api/census/patient/add', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            })
            const data = await response.json();
            
            if (response.ok) {
                console.log("Add ok")
                handleCloseAddPatient()
            }
            else{
                console.log(data.error)
                handleCloseAddPatient()
            }

        } catch (err) {
            console.log(`Error: ${error.message}`)
            handleCloseAddPatient()
        }

    }

    if (!isOpen) {
        return null
    }

    return (
        <>
            <div className="container-form-addPatient">
                <form id='form' onSubmit={handleSave}>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name"  onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    </div>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastname"  onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age"  onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">SSN</label>
                        <input type="number" class="form-control" id="ssn"  onChange={(e) => setSsn(e.target.value)} placeholder="SSN" required />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-success" >Save</button>
                        <button type="submit" class="btn btn-outline-secondary mx-2" onClick={handleCloseAddPatient}>Close</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddPatient