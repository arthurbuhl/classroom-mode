import React, { Component } from 'react'
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
  ButtonGroup,
} from 'react-bootstrap'
import axios from 'axios'

export default class EditStudent extends Component {
  state = { isSubmitting: false, student: {} }
  static getDerivedStateFromProps = nextProps =>
    nextProps.student ? { student: nextProps.student } : null

  submit = () => {
    const { onClose } = this.props

    this.setState({ isSubmitting: true })
    axios
      .put('/students', this.state.student)
      .then(res => {
        onClose(res.data)
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event

    this.setState({
      student: { ...this.state.student, [name]: value },
    })
  }

  render() {
    const { isOpen, onClose, student = {} } = this.props
    return (
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="PUT">
            <FormGroup controlId="name">
              <ControlLabel>Name: </ControlLabel>
              <FormControl
                type="text"
                name="name"
                defaultValue={student.name}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="username">
              <ControlLabel>FCC Username: </ControlLabel>
              <FormControl
                type="text"
                name="username"
                defaultValue={student.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="email">
              <ControlLabel>Email: </ControlLabel>
              <FormControl
                type="text"
                name="email"
                defaultValue={student.email}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="Notes">
              <ControlLabel>Notes: </ControlLabel>
              <FormControl
                type="text"
                name="notes"
                defaultValue={student.notes}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <ButtonGroup>
              <Button disabled={this.state.isSubmitting} onClick={onClose}>
                Close
              </Button>
              <Button
                className="submit"
                disabled={this.state.isSubmitting}
                onClick={this.submit}
              >
                Submit
              </Button>
            </ButtonGroup>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
