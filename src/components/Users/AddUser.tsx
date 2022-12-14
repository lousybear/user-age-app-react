import React, { useRef, useState } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

export default function AddUser(props: any) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState<{ title: string; message: string }>();

  const addUserHandler = (event: any) => {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value as string;
    const enteredUserAge = ageInputRef.current?.value as string;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid username and age',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Age should be greater than 0',
      });
    }
    props.onAddUser(enteredName, enteredUserAge);
    if (nameInputRef.current && ageInputRef.current) {
      ageInputRef.current.value = '';
      nameInputRef.current.value = '';
    }
  };

  const usernameChangeHandler = (event: any) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event: any) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(undefined);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}
