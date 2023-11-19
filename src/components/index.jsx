
import React, {useState} from 'react';
import { Button, div, Form, Col, Toast, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/uob.png'
import {Link} from 'react-router-dom'
import { faSave, faTrash, faTruck, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

export const BackButton =({ path }) =>{

	return(
		<Link to={path}>
			<Button
	      variant='dark'
	      size='md'
	      className="mt-5 mb-2 btn-extra"
	    >
	      <FontAwesomeIcon icon={faChevronLeft} />
	      <b> Back </b>
	    </Button>
    </Link>
	)
}



export const Skeleton = ({ props }) => {

	return(
		<div class="container mt-4" {...props} >
		    <div class="row">
		      <div class="col-md-6 mx-auto loading-skeleton" style={{height: '20px'}}></div>
		    </div>
		    <div class="row mt-3">
		      <div class="col-md-8 mx-auto loading-skeleton" style={{height: '15px'}}></div>
		    </div>
		    <div class="row mt-3">
		      <div class="col-md-4 mx-auto loading-skeleton" style={{height: '10px'}}></div>
		    </div>
		</div>
	)
}

export const PageLoader = () => {
	return(
		<div className="w-100 h-100 d-flex justify-content-center loading-skeleton position-absolute align-content-center"
			style={{
				width:"100%",
				height: "100vh",
				animation: 'grayOut 1s infinite'
				// backgroundImage={url('../images/uob.png')}
			}}
		>
			<img src={logo} className="" style={{
			    background: 'none',
			    top: '15vh',
			    height: '400px',
			    position: 'absolute',
			    width: '100%',
			    maxWidth: '440px'
			}} />
				
		</div>
	)
}

export const Notification = ({ title, body, onClose, show, level }) => {

  // setTimeout(() => setShow(false), 3500)

  return (
    <Toast bg={level || 'dark'} onClose={onClose} show={show} > {/* delay={3500} autohide */}
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body className="text-white">{body}</Toast.Body>
    </Toast>
    )
}





