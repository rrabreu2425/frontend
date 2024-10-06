
import { auth, signOut } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom"
function Layout({ idToken, name, user, email }) {

    const [rol, setRol] = useState([])
    const [rolSelect, setRolSelect]=useState('')

    const handleLogout = async () => {
        try {
            await signOut(auth).then(() => {
                setRol('')
                setRolSelect('')
                navigate('/')
            })

        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }
    const getRol = async () => {
        const Email = email
        await fetch(`http://localhost:8000/api/userRol/byEmail?email=rrabreu2425@gmail.com`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setRol(data.Items)
            })
            .catch((err) => console.error('Error:', err));
    }

    useEffect(() => {
        getRol()
        if(rol.length==1){
          setRolSelect(rol[0].Rol)
        }
    })
    const navigate = useNavigate();

    if (!user) return null
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Home</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {rolSelect==='CENSUS' && (<>
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" href="#">Patients</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" href="#">Link</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Patients
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" href="#">Assign Patient Lists to Providers</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" href="#">Something else here</Link></li>
                                    </ul>
                                </li>                                
                            </>)}
                            {rolSelect==='ADMIN' && (<>
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" href="#">Admin User</Link>
                                </li>
                                
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admin
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" href="#"></Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" href="#"></Link></li>
                                    </ul>
                                </li>                                
                            </>)}
                            <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#" onClick={handleLogout}>LogOut</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='select-rol'>
                    <select class="form-select" aria-label="Default select example" onClick={(e)=>{setRolSelect(e.target.value)}}>
                        {rol.map((item) => (
                            <option value={item.Rol}>{item.Rol}</option>
                        ))}
                    </select>
                </div>
            </nav>


        </>)
}




export default Layout