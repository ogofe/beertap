import {GlobalStore} from '../../App';
import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import {Button, InputGroup, Form, Container} from 'react-bootstrap'
import { BackButton } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import useRoleBasedAccess from '../../hooks/useRole';

function AddSuppliers() {
    const [required, setRequired] = [true]
    const [supplier, setSupplier] = useState({
        name: ""
    })
    const {apiUrl, axios} = useContext(GlobalStore);
    useRoleBasedAccess(['Super Admin', 'Admin'])
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSupplier((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log(supplier)

    const handleClick = async e => {
        e.preventDefault()
        const supplierUrl = `${apiUrl}/suppliers/`
        console.log(supplierUrl)
        try {
            await axios.post(supplierUrl, supplier)
            navigate("/suppliers")
        } catch (err) {
            console.log(err)
            
        }
    }

  return (
    <div className='page'>
    <Container className='form contMargin'>
        
        <BackButton path={'/suppliers'} />

        <h2 className='listUntapTitle'>Add New Supplier</h2>

        <div size="lg" className='bg-light rounded p-2'>
            <label className='form-label' id="inputGroup-sizing-lg">Supplier Name</label>
            <Form.Control
                style={{ maxWidth: 500 }}
                onChange={handleChange} 
                name='name'
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                setRequired
            />
        </div>

        <div className="bg-light p-2 rounded my-3">
            <Button className='btn-extra bold' variant='primary' size='md' onClick={handleClick}>
                <FontAwesomeIcon icon={faSave} className='mr-1' />
                Add Supplier
            </Button>
        </div>
    </Container>
    </div>
  )
}

export default AddSuppliers