import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const Home = () => {
  const { scrollRef } = useSnapCarousel();
  return (
    <div className='layout'>
        <div><h1>Welcome to MyCharts!</h1></div>
    <div style={{ display: 'flex'}}>
        
      <div className='center'>
        <h3> Select a chart type to see how each one works <br></br>
                ... or sign with your Google account to start creating your own.</h3> 
      </div> 
      
      <ul
        ref={scrollRef}
        style={{
          display: 'flex',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => ( //TODO: all 6..
          <li
            style={{
              backgroundColor: 'white',
              width: '350px',
              height: '300px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '50px',
              marginLeft: '20px',
              borderWidth: '1px',
              borderTopColor: 'grey',
              borderStyle: 'solid'
            }}
            key={i}
          >
            <a href={`/preview/chart_${4 - i}`}>
           <img
              src={`/sample_charts/sample_chart_${4 - i}.png`} // anapoda gt prettier

              style={{
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Home;
