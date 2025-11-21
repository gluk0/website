import React from 'react'
import { Link } from 'react-router-dom'
import './BackButton.css'

const BackButton = ({ theme }) => {
  return (
    <Link
      to="/"
      className="back-button"
      style={{ color: theme.text }}
    >
      ← back
    </Link>
  )
}

export default BackButton
