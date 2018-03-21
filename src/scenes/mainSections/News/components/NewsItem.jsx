import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const NewsItem = ({ news: { author, body, createdAt, id, image, title } }) => {
  return (
    <li className="lg:w-1/2 lg:pl-4 mb-6">
      <div className=" bg-white lg:lt-shadow">
        <figure
          style={
            {
              // backgroundImage: `url('/static/images/register-bg.png')`,
            }
          }
          className=""
        >
          <div className="">{!!image && <img src={image} alt={title} />}</div>
        </figure>
        <div className="flex-grow p-8 py-6">
          <h3 className="mb-2 text-3xl hind">{title}</h3>
          <div className="text-grey text-sm mb-6">
            {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          <p className="text-sm text-grey-darker tracking-tight leading-normal">
            {body}
          </p>
          {/* <Link
            to={`/app/news/${id}`}
            className="inline-block text-pink-dark mt-8 mb-4 text-sm"
          >
            Read more
          </Link> */}
        </div>
      </div>
    </li>
  )
}

export default NewsItem
