import React, { useState, useEffect } from 'react';
import {TrainSingleComp, Status, InfoContainer, SmallP} from './styled'
import InfoContainerComp from './InfoContainer.js'

// interface Props {
//   expectedArrival?: string;
//   status: string;
//   destination: string;
//   time: boolean;
//   early: boolean;
//   late: boolean;
//   noReport: boolean;
//   onTime: any;
//   operator_name: string;
//   service_timetable: {
//     id?: string;
//     timetables: {
//       stops?: array;
//     }
//   };
//
// }



const TrainSingle = (props) => {
// const TrainSingle: React.FC<Props> = ({expectedArrival, status, destination, onTime, early, late, noReport, service_timetable, operator_name}): JSX.Element => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWorked, setHasWorked] = useState(false);
  const [hasError, setHasError] = useState(false)
  const {expectedArrival, status, destination, onTime, early, late, noReport, service_timetable, operator_name} = props
  const renderStatus = (status) => {
    if (status == 'ON TIME') {
      return (
        <Status time>On time</Status>
      )
    } else if (status == 'EARLY') {
      return (
        <Status early>Early</Status>
      )
    } else if (status == 'LATE') {
      return (
        <Status late>Late</Status>
      )
    } else if (status == 'CHANGE OF ORIGIN') {
      return (
        <Status changeOfOrigin>Change of origin</Status>
      )
    } else if (status == "NO REPORT") {
      return (
        <Status noReport>No report</Status>
      )
    }
  }

  const renderEustonArrival = (result) => {
    console.log('result in renderEustonArrival', result)
    return (
      <div>
        lol
      </div>
    )
  }

  useEffect(() => {
      fetch(service_timetable.id)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setHasWorked(true);
            setTimetables(result)
            console.log('TrainSingle >> ', 'isLoaded:', isLoaded, 'hasWorked:', hasWorked, 'timetable result:', result )
            return result
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log('TrainSingle >> ', 'isLoaded:', isLoaded, 'error', error)
          }
        )
    }, [])
  let timetable = timetables.stops
  console.log('stops:', timetable)

  const getEuston = (timetable) => {
    if (timetable != undefined) {
      // console.log('timetable in func != undefined:', timetable)
      const euston = timetable.find(stop => stop.station_code == 'EUS')
      // const euston = timetable.slice(-1)[0]
      // console.log('euston', euston)
      const eustonArrivalTime = euston.expected_arrival_time
      return eustonArrivalTime
    }
  }

  const getBerkhamstedPlatform = (timetable) => {
    if (timetable != undefined) {
      // console.log('timetable in func != undefined:', timetable)
      const berkhamsted = timetable.find(stop => stop.station_code == 'BKM')
      const berkhamstedPlatform= berkhamsted.platform
      return berkhamstedPlatform
    }
  }

  const getEustonPlatform = (timetable) => {
    if (timetable != undefined) {
      // console.log('timetable in func != undefined:', timetable)
      const euston = timetable.find(stop => stop.station_code == 'EUS')
      // const euston = timetable.slice(-1)[0]
      // console.log('euston', euston)
      const eustonPlatform= euston.platform
      return eustonPlatform
    }
  }

  const renderAllStationsOnJourney = (timetable) => {
    if (timetable != undefined) {
      console.log('timetable:', timetable)
      return timetable.map((stop, i) => {
        // console.log('stop', stop)
        let count = 0;
        const { station_code, station_name, expected_arrival_time } = stop
        // console.log('station_code', station_code)
        if (
            station_code == "HML" ||
            station_code == "APS" ||
            station_code == "KGL" ||
            station_code == "WFJ" ||
            station_code == "BSH" ||
            station_code == "HRW"
          ) {
          console.log('successful stop:', stop)
          count = i
          console.log('count', count)
          return (
            <InfoContainer className='infoContainer'>
              <SmallP className='small-p'>{station_name}</SmallP>
              <SmallP className='arrival'>{expected_arrival_time}</SmallP>
            </InfoContainer>
          )
        }
      })
    }
  }
// {renderAllStationsOnJourney(timetable)}
  return (
    <TrainSingleComp >
      <div className='timeStatus'>
        <div className='timeDesination'>
          <InfoContainerComp firstStop name='Berkhamsted' arrival={expectedArrival} platformNumber={null} operatorName={operator_name} />

          <div className='additionalStops'>

          </div>
          <InfoContainerComp finalDestination name='Euston' arrival={getEuston(timetable)} platformNumber={getEustonPlatform(timetable)} />

        </div>
      {renderStatus(status)}

      </div>
    </TrainSingleComp>
  );
};

export default TrainSingle;

// {timetable.map(item => {
//   return (
//     <div>timetable</div>
//   )
// }
// )}
