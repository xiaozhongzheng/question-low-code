import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

const Stat: FC = () => {
  const {id} = useParams();
  return (
    <div>index</div>
  )
}

export default Stat;