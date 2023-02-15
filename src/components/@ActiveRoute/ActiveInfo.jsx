import React from 'react';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
// import { useRef } from 'react';

export default function ActiveInfo () {
  // const titleRef = useRef();
  const points = useSelector((store) => store.points) 

  let activeSinglePoint = 'baker';
  
  function setActiveChapter(singlePoint) {
    if (singlePoint === activeSinglePoint) return;
    
    map.flyTo(points[singlePoint]);
    
    document.getElementById(singlePoint).classList.add('active');
    document.getElementById(activeSinglePoint).classList.remove('active');
    
    activeSinglePoint = singlePoint;
  }
  
  function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }
  
  // On every scroll event, check which element is on screen
  window.onscroll = () => {
    console.log('hi')
    for (const singlePoint in points) {
      if (isElementOnScreen(singlePoint)) {
        setActiveChapter(singlePoint);
        break;
      }
    }
  };
  

  return (
    <>
    {/* <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
      >
          
      <ul>  
        {points.map((point) => {
          return (
            <>
            <ListItem 
              key={`${point.id}`}
              data-id={`${point.id}`}
              class=""
              >
            <ListItemText 
              primary={`${point.name}`}
              secondary={`${point.short_desc}`}></ListItemText>
            </ListItem>
            </>
          )
        })}
        
      </ul>
      </List> */}
    </>
  )
}