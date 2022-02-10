import React from 'react'
import '../styles/loading-screen.css'

const Loading = () => {
  return (
      <div className='overlay'>
          <div className="lds-ellipsis">
              <div></div><div></div><div></div><div></div>
          </div>
      </div>
  )};

export default Loading;
