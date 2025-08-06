import MyLoading from '@/components/MyLoading'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  const {loading} = useLoadingQuestion()
  return (
    <>
      {/* <div>question header</div> */}
      {loading && <MyLoading />}
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default QuestionLayout;