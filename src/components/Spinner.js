import React from 'react'
import loading from '../loading2.gif'

const spinner = () => {
    return (
      <div>
          <center> <img className='my4' src={loading} alt="loading icon" /> </center>
      </div>
    )
}

export default spinner;
