import React, { useState, useEffect } from 'react';
import TrainSingle from '../TrainSingle'

function RenderTrains(): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWorked, setHasWorked] = useState(false);
  const [hasError, setHasError] = useState(false)
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetch("http://transportapi.com/v3/uk/train/station/BKM/live.json?query&app_id=ceabf0ac&app_key=3d40a87351cfa3eebd978e20372e44e6")
        .then(res => res.json())
        .then(
          (result) => {
            console.log('isLoaded:', isLoaded, 'hasWorked, ', hasWorked, ' result.departures:', result.departures )
            setIsLoaded(true);
            setItems(result.departures);
            setHasWorked(true);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (isLoaded && hasWorked) {
      console.log('items wasnt undefined', items)
      console.log('items.all', items.all)
      let itemsAll = items.all
      console.log('itemsAll', itemsAll)
      const result = items.all.filter(item => item.destination_name = "London Euston");
      console.log('result:', result);
      return (
        <ul>
        {result.map(item => {
          return (
            <TrainSingle key={item.train_uid} expectedArrival={item.expected_arrival_time} status={item.status} destination={item.destination_name} />
          )
        }
        )}
        </ul>
      );
    } else {
      return (
        <h1>no data loaded</h1>
      )
    }
}

export default RenderTrains;
