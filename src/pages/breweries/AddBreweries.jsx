import React, { useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components';
import {Button, div, Form, Container} from 'react-bootstrap'
import {GlobalStore} from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


function AddBreweries() {
    const [brewery, setBrewery] = useState({
        name: "",
        location:""
    })
    const {apiUrl} = useContext(GlobalStore)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBrewery((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(brewery)

    const handleClick = async e => {
        e.preventDefault()
        const breweryUrl = "${apiUrl}/breweries/"
        try {
            await axios.post(breweryUrl, brewery)
            navigate("/breweries")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <div className="page">
        <Container className='form contMargin'>
            <BackButton path="/breweries" />

            <h2 className='listUntapTitle'> Add New Brewery </h2>
            
            <div className="p-2 rounded bg-light">
                <div>
                    <div size="lg">
                        <label className="form-label" id="div-sizing-lg">Brewery Name</label>
                        <Form.Control
                          onChange={handleChange} 
                          name='name'
                          aria-label="Large"
                          style={{maxWidth: '500px'}}
                          aria-describedby="div-sizing-sm"
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <div size="lg">
                        <label className="form-label" id="div-sizing-lg">Location</label>
                        <Form.Control
                          onChange={handleChange} 
                          name='location'
                          aria-label="Large"
                          style={{maxWidth: '500px'}}
                          aria-describedby="div-sizing-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-light rounded p-2 my-3">
                <Button className='btn-extra w-fit bold' variant='primary' size='md' onClick={handleClick}>
                  <FontAwesomeIcon icon={faSave} />  Save Brewery
                </Button>
            </div>

        </Container>
    </div>
  )
}

export default AddBreweries