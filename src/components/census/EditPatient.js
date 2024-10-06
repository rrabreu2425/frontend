import { useState } from 'react'
import '../../css/addPatient.css'
function EditPatient({ Name, SSN, isOpenEdit, handleCloseEditPatient, idToken }) {
    //console.log(Name)
    //
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(null)
    //const [ssn, setSsn] = useState(SSN)
    const [error, setError] = useState('')
    //console.log(SSN)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let isOk = true;
        const parName = Name
        const parSSN = SSN
        if (!parName) {
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
        if (!parSSN) {
            setError('The input SSN is requeried')
            isOk = false
        }
        else {
            setError('')
        }
        if (!isOk) return

        const params = {
            SSN: Number(SSN),
            Name: Name,
            LastName: lastName,
            Age: age
        }


        try {
            const response = await fetch('http://localhost:8000/api/census/patient/edit', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            })
            const data = await response.json();

            if (response.ok) {
                console.log("Edit ok")
                handleCloseEditPatient()
            }
            else {
                console.log(data.error)
                handleCloseEditPatient()
            }

        } catch (err) {
            console.log(`Error: ${error.message}`)
            handleCloseEditPatient()
        }

    }


    if (!isOpenEdit) {
        return null
    }
    return (
        <>
            <div className="container-form-addPatient">
                <form id='form' onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" value={Name} placeholder="Name" required />
                    </div>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastname" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age" onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">SSN</label>
                        <input type="number" class="form-control" id="ssn" value={SSN} placeholder="SSN" required />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-success" >Edit</button>
                        <button type="submit" class="btn btn-outline-secondary mx-2" onClick={handleCloseEditPatient}>Close</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditPatient