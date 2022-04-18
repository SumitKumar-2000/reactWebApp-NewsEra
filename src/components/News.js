import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  // static is used to make use of proptypes
  const [articles, setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,settotalResults] = useState(0)
  document.title = `NewsEra - ${(props.category)}`;

  const updateNews = async ()=> {
    props.setProgress(10);
    console.log(props.country);
    console.log(props.category);
    console.log(props.page);
    const Url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=927148b63e4c48a18028016c14ff5ed2&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let Data = await fetch(Url);
    let parsedData = await Data.json();
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews()
  },[])     

  const fetchMoreData = async () => {
    const Url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=927148b63e4c48a18028016c14ff5ed2&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let Data = await fetch(Url);
    let parsedData = await Data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className='text-center' style={{margin: '50px 0px',marginTop:'90px'}}>NewsEra - Top {props.category} Headlines</h1>
        {loading && <Spinner/>}
        {/* adding infinite scroll */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row my-4">  
              {articles.map((item)=>{
                return <div className="col-md-4" key={item.url}> {/* it is highly recomended to add unique key, and add it within the element which you are returning*/}
                          <Newsitem title={item.title ? item.title.slice(0,50) :""} description={item.description ? item.description.slice(0,100):""} imageUrl={item.urlToImage} newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name}/>   
                      </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'sports'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
