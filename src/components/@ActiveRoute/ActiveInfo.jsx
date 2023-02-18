import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Point name, small description, in route order.
export default function ActiveInfo () {
  const pointDetail = useSelector((store) => store.pointDetail) 

  return (
    <>
      {pointDetail?.map((point) => {
        return (
          <section 
            key={`${point.id}`} 
            id={`${point.name}`}
            longitude={`${point.longitude}`}
            latitude={`${point.latitude}`}
            className="test"
          >
            <h1>{`${point.name}`}</h1>
            {point.address && <sup>{`${point.street_address}`}</sup>}
            <p>{`${point.short_desc}`}</p>
            {point.id !=8 && <Link to={`/pointDetail/${point.id}`}>Read More</Link>}
          </section>
        )
      })}
    </>
  )
}