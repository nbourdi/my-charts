import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const Home = () => {
  const { scrollRef } = useSnapCarousel();
  return (
    <div className='layout'>
        <div><h1>Welcome to MyCharts!</h1></div>
        <div >
          Select a chart type to see how each one works 
                ... or <b>sign with your Google account</b> to start creating your own. 
      </div>

    <div style={{paddingTop: '3rem'}}>
      <ul
        ref={scrollRef}
        style={{
          display: 'flex',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {Array.from({ length:  6}).map((_, i) => ( //TODO: all 6..
          <li
            style={{
              backgroundColor: 'white',
              width: '330px',
              height: '250px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              marginBottom: '50px',
              marginRight: '25px',
              borderWidth: '1px',
              borderTopColor: 'grey',
              borderStyle: 'solid'
            }}
            key={i}
          >
            <a href={`/create/chart_${6 - i}`}>
           <img
              src={`/sample_charts/sample_chart_${5 - i}.png`} // anapoda gt prettier

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
