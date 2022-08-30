import React, { useState } from 'react';
import '../css/recipeDetails.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useRecipesContext } from '../hooks/useRecipesContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function RecipeDetails({ recipe }) {
  const { dispatch } = useRecipesContext();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [duration, setDuration] = useState(recipe.duration);
  const [preparation, setPreparation] = useState(recipe.preparation);

  // Triggering the Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cancel Edit
  const handleCancelEdit = () => {
    handleClose();
    setTitle(recipe.title);
    setDuration(recipe.duration);
    setPreparation(recipe.preparation);
  };

  // Handling Delete Request
  const handleDelete = async () => {
    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'DELETE',
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_RECIPE', payload: json });
    }
  };

  // Handling Update Req
  const handleUpdate = async () => {
    console.log(recipe._id);
    const updateRecipe = { title, duration, preparation };

    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'PATCH',
      body: JSON.stringify(updateRecipe),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_RECIPE', payload: json });
    }
    handleClose();
  };

  return (
    <>
      <div className="modal">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update the Recipe: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration: </Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Preparation: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={preparation}
                  onChange={(e) => setPreparation(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="recipeDetails-container">
        <div className="recipeDetails-inner">
          {' '}
          <div className="title">
            <b>Title:</b> {recipe.title}
          </div>
          <div className="duration">
            {' '}
            <b>Duration: </b> {recipe.duration}
          </div>
          <div className="preparation">
            {' '}
            <b>Preparation: </b>
            {recipe.preparation}
          </div>
          <div className="createdat">
            Created At:{' '}
            {formatDistanceToNow(new Date(recipe.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="recipeDetails-buttons">
          <span className="button btn-update" onClick={handleShow}>
            Update
          </span>
          <span className="button btn-delete" onClick={handleDelete}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
