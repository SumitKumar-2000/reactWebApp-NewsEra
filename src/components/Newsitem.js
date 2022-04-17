import React from 'react'

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="card my-3" style={{borderRadius: "10px"}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill" style={{zIndex: 1,left: '88%', backgroundColor: '#000000a1'}}>{source}</span>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <p className='card-text'><small className='text-success'>By {author === null?"unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="#" className="btn btn-dark">Read More</a>
        </div>
      </div>
    )
}

export default Newsitem
