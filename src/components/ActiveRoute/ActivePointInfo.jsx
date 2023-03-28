import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ActiveRoute.css';

// Point name, small description, in route order.
export default function ActivePointInfo ({pointsByRoute}) {
  // const pointDetail = useSelector((store) => store.points.pointsByRouteReducer) 

  return (
    <>
      {pointsByRoute.map((point) => {
        return (
          <section 
            key={`${point.id}`} 
            id={`${point.name}`}
            longitude={`${point.longitude}`}
            latitude={`${point.latitude}`}
            className="test"
          >
            <h1>{`${point.name}`}</h1>
            <p>{`${point.short_desc}`}</p>
            {point.id !=8 && 
              <Link to={`/pointDetail/${point.id}`}>
                Read More
              </Link>}
          </section>
        )
      })}
    </>
  )
}