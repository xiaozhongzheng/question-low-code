import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'
const QuestionLayout: FC = () => {
  return (
    <>
        <div>question header</div>
        <div>
            <Outlet />
        </div>
    </>
  )
}

export default QuestionLayout;