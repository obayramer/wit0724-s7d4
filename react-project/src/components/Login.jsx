import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const initialError = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password:
    'Password must be at least 8 characters long and should be a mix of letters, numbers, and special characters',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialError);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const history = useHistory();

  useEffect(() => {
    const validEmail = validateEmail(form.email);
    const validPassword = validatePassword(form.password);
    const validTerms = form.terms;

    setErrors({
      email: touched.email && !validEmail ? errorMessages.email : '',
      password: touched.password && !validPassword ? errorMessages.password : '',
      terms: !validTerms ? 'You must accept the terms' : '',
    });

    setIsValid(validEmail && validPassword && validTerms);
  }, [form, touched]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const inputValue = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: inputValue });

    setTouched({ ...touched, [name]: true });
  };

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validateEmail = (email) => {
    return emailRegex.test(email.toLowerCase().trim());
  };

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    try {
      const res = await axios.get(
        'https://6540a96145bedb25bfc247b4.mockapi.io/api/login'
      );
      const user = res.data.find(
        (item) =>
          item.password === form.password && item.email === form.email
      );
      if (user) {
        setForm(initialForm);
        history.push('/main');
      } else {
        history.push('/error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
        />
        {errors.password && (
          <FormFeedback>{errors.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button disabled={!isValid} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}