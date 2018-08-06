import React, { Component } from "react";
import { Config } from "../config.js";

import { Container, Button, Form, FormGroup, Input } from "reactstrap";

class Contact extends Component {
  formRef = React.createRef();
  nameRef = React.createRef();
  emailRef = React.createRef();
  businessNameRef = React.createRef();
  phoneRef = React.createRef();
  websiteRef = React.createRef();
  valueRef = React.createRef();
  textareaRef = React.createRef();

  submitForm = e => {
    e.preventDefault();
    // get our form data out of state
    const data = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value,
      businessName: this.businessNameRef.current.value,
      phone: this.phoneRef.current.value,
      website: this.websiteRef.current.value,
      value: this.valueRef.current.value,
      textarea: this.textareaRef.current.value
    };

    const form = this.formRef;
    fetch(`${Config.apiUrl}/wp-json/orpheus/v1/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        if (myJson === "message sent") {
          console.log(myJson);
        } else {
          console.log("error");
        }
      });

    this.nameRef.current.value = "";
    this.emailRef.current.value = "";
    this.businessNameRef.current.value = "";
    this.phoneRef.current.value = "";
    this.websiteRef.current.value = "";
    this.valueRef.current.value = "";
    this.textareaRef.current.value = "";
  };

  render() {
    return (
      <Container className="page-content">
        <Form
          className="contact-form"
          style={{ padding: "0 10%" }}
          onSubmit={this.submitForm}
          ref={this.formRef}
        >
          <FormGroup>
            <input
              type="text"
              name="name"
              ref={this.nameRef}
              placeholder="Please enter your Name *"
              className="form-control"
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="email"
              name="email"
              ref={this.emailRef}
              className="form-control"
              placeholder="Please enter your Email"
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              name="businessName"
              ref={this.businessNameRef}
              className="form-control"
              placeholder="Please enter your Business Name "
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              name="phone"
              ref={this.phoneRef}
              className="form-control"
              placeholder="Please enter your phone *"
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              name="website"
              ref={this.websiteRef}
              className="form-control"
              placeholder="Please enter your Website "
            />
          </FormGroup>
          <FormGroup>
            <select
              name="value"
              ref={this.valueRef}
              className="form-control"
              id="select"
            >
              <option value="Which area does your organization need to support the most?">
                Which area does your organization need to support the most?
              </option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Marketing">Marketing</option>
              <option value="Websites / SEO">Websites / SEO</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Strategy">Strategy</option>
              <option value="Support">Support</option>
            </select>
          </FormGroup>
          <FormGroup>
            <textarea
              className="form-control"
              name="textarea"
              ref={this.textareaRef}
              placeholder="Please enter your Message "
              cols="40"
              rows="4"
            />
          </FormGroup>
          <Button
            className="btn btn-outline-light btn-lg btn-block"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Contact;
