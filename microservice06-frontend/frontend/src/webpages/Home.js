import React, { useEffect } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const Home = () => {
  const { scrollRef, next } = useSnapCarousel();

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 1500); // Adjust the interval (in milliseconds) as needed

    return () => {
      clearInterval(interval);
    };
  }, [next]);

  return (
    <div className='layout'>
      <div>
        <h1>Welcome to MyCharts</h1>
      </div>
      <div>
        Select a chart type to see how each one works... or <b>sign in with your Google account</b> to start creating your own.
      </div>

      <div style={{ paddingTop: '3rem' }}>
        <ul
          ref={scrollRef}
          style={{
            display: 'flex',
            overflow: 'auto',
            scrollSnapType: 'x mandatory',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              style={{
                backgroundColor: 'white',
                width: '450px',
                height: '380px',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                marginBottom: '50px',
                marginRight: '25px',
                marginTop: '5%',
              }}
              key={i}
            >
              <a href={`/create/chart_${6 - i}`}>
                <img
                  src={`/sample_charts/sample_chart_${5 - i}.png`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
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
