import React from 'react';
import { Link } from 'react-router-dom';
import { sketches } from '../sketches';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {Object.keys(sketches).map(key => (
          <li key={key}>
            <Link to={`/${key}`}>{key}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 