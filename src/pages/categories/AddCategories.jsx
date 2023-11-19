import React, { useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components';
import {Button, InputGroup, Form, Container} from 'react-bootstrap'
import {GlobalStore} from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


function AddCategories() {
    const [category, setCategory] = useState({
        name: "",
        type:""
    })

    const navigate = useNavigate()
    const {apiUrl} = useContext(GlobalStore)
    const handleChange = (e) => {
        setCategory((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(category)

    const handleClick = async e => {
        e.preventDefault()
        const categoryUrl = `${apiUrl}/categories/`
        try {
            await axios.post(categoryUrl, category)
            navigate("/categories")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <div className="page">
        <Container className='form contMargin'>
            <BackButton path="/categories" />

            <h2 className='listUntapTitle mb-3'> Add New Category </h2>

            <div className="p-2 rounded bg-light">
                <div style={{ maxWidth: '500px'}}>
                    <div size="lg">
                        <label className="form-label" id="inputGroup-sizing-lg">Category Name</label>
                        <Form.Control
                          onChange={handleChange} 
                          name='name'
                          aria-label="Large"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                    </div>
                </div>

                <div style={{ maxWidth: '500px'}} className="mt-3">
                    <div size="lg">
                        <label className="form-label" id="inputGroup-sizing-lg">Type</label>
                        <Form.Control
                          onChange={handleChange} 
                          name='type'
                          aria-label="Large"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-light p-2 rounded my-3">
                <Button className='btn-extra bold w-fit' variant='primary' size='md' onClick={handleClick}>
                <FontAwesomeIcon icon={faSave} /> Save Category </Button>
            </div>

        </Container>
    </div>
  )
}

export default AddCategories