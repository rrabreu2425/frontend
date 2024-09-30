import { useEffect, useState } from "react"
import { getAuth } from 'firebase/auth';
function InfoAPI({ idToken }) {
    const [info, setInfo] = useState('')
    const auth = getAuth();

    useEffect(() => {
        if(idToken){
            getInfo(idToken)
        }
        
    }, [idToken])

    const getInfo = async(idToken) => {
        await fetch('http://localhost:8000/api/info', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {

                setInfo(data.name)
            })
            .catch((err) => console.error('Error:', err));
    }

    return (
        <>
            <div>{info}</div>
        </>

    )
}
export default InfoAPI