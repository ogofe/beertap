import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components';
import {Button, InputGroup, Form, Container} from 'react-bootstrap'
import {GlobalStore} from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';



function AddKegSize() {
    const [kegsize, setKegsize] = useState({
        size: ""
    })

    const navigate = useNavigate()
    const {apiUrl} = useContext(GlobalStore)
    const handleChange = (e) => {
        setKegsize((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(kegsize)

    const handleClick = async e => {
        e.preventDefault()
        const kegsizeUrl = `${apiUrl}/kegsizes/`
        console.log(kegsizeUrl)
        try {
            await axios.post(kegsizeUrl, kegsize)
            navigate("/kegsizes")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <div className="page">
        <Container className='form contMargin'>

            <BackButton path="/kegsizes" />

            <h2 className='listUntapTitle my-4'> Add New Keg Size </h2>

            <div size="lg" className="bg-light rounded p-2" >
                <label id="inputGroup-sizing-lg" className="form-label">Keg Size</label>
                <Form.Control
                  onChange={handleChange} 
                  name='size'
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{maxWidth: 500}}
                />
            </div>

            <div className="bg-light rounded p-2 my-3">
                <Button className='btn-extra bold w-fit' variant='primary' size='md' onClick={handleClick}><FontAwesomeIcon icon={faSave} /> Save Keg Size </Button>
            </div>
        </Container>
    </div>
  )
}

export default AddKegSize