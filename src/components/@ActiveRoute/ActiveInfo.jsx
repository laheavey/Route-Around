import React from 'react';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom';
// import { useRef } from 'react';

export default function ActiveInfo () {
  // const titleRef = useRef();
  const pointDetail = useSelector((store) => store.pointDetail) 

  
  // function setActiveChapter(singlePoint) {
  //   if (singlePoint === activeSinglePoint) return;
    
  //   map.flyTo(points[singlePoint]);
    
  //   document.getElementById(singlePoint).classList.add('active');
  //   document.getElementById(activeSinglePoint).classList.remove('active');
    
  //   activeSinglePoint = singlePoint;
  // }
  
  // function isElementOnScreen(id) {
  //   const element = document.getElementById(id);
  //   const bounds = element.getBoundingClientRect();
  //   return bounds.top < window.innerHeight && bounds.bottom > 0;
  // }
  
  // // On every scroll event, check which element is on screen
  // window.onscroll = () => {
  //   console.log('hi')
  //   for (const singlePoint in points) {
  //     if (isElementOnScreen(singlePoint)) {
  //       setActiveChapter(singlePoint);
  //       break;
  //     }
  //   }
  // };
  

  return (
    <>

      {pointDetail?.map((point) => {
        return (
          <section 
            key={`${point.id}`} 
            id={`${point.name}`}
            longitude={`${point.longitude}`}
            latitude={`${point.latitude}`}>
            <h3>{`${point.name}`}</h3>
            {point.address && <sup>{`${point.street_address}`}</sup>}
            <p>{`${point.short_desc}`}</p>
            {point.id !=8 && <Link to={`/pointDetail/${point.id}`}>Read More</Link>}
          </section>
        )

      })}
    </>
  )
}