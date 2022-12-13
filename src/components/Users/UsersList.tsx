import React from 'react';
import Card from '../UI/Card';
import classes from './UsersList.module.css';

export default function UsersList(props: any) {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user: any) => (
          <li key={user.id}>
            {user.username} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
}
