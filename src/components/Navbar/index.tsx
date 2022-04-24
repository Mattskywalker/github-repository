
import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className="navbar" >
            <div>
                <Link style={{ textDecoration: 'none' }} to={'/'} >
                    <Typography variant='h4' style={{ color: '#FFFFFF' }} >
                        GitHub Repository
                    </Typography></Link>
            </div>
            <span className='spacer' />


            <Button onClick={() => {
                navigate('/favorites')
            }} variant='outlined' className='fav-button' ><Typography variant='h5' >Favoritos</Typography></Button>


        </div>
    )
}

export default Navbar