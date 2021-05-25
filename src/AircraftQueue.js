import React, { useState } from 'react';

function AircraftQueue() {

  const [largePassenger, setLargePassenger] = useState([]);
  const [smallPassenger, setSmallPassenger] = useState([]);
  const [largeCargo, setLargeCargo] = useState([]);
  const [smallCargo, setSmallCargo] = useState([]);

  const [aircraftID, setAircraftID] = useState(0);

  const [selected, setSelected] = useState({
    size: "small",
    type: "passenger"
  });

  const [dequeued, setDequeued] = useState({});

  const [systemOn, setSystemOn] = useState(false);

  const bootSystem = (event) => {
    setLargeCargo([])
    setSmallPassenger([])
    setLargeCargo([])
    setSmallCargo([])
    setAircraftID(0)
    setDequeued({})
    setSystemOn(!systemOn)
  }

  const changeSize = (event) => {
    setSelected({
      ...selected,
      size: event.target.value
    })
  }

  const changeType = (event) => {
    setSelected({
      ...selected,
      type: event.target.value
    })
  }

  const queueAircraft = (event) => {
    if (selected.size == "large" && selected.type == "passenger") {
      setLargePassenger([...largePassenger, aircraftID])
    } else if (selected.size == "small" && selected.type == "passenger") {
      setSmallPassenger([...smallPassenger, aircraftID])
    } else if (selected.size == "large" && selected.type == "cargo") {
      setLargeCargo([...largeCargo, aircraftID])
    } else if (selected.size == "small" && selected.type == "cargo") {
      setSmallCargo([...smallCargo, aircraftID])
    }
    setAircraftID(aircraftID + 1)
  }

  const dequeueAircraft = (event) => {
    if (largePassenger.length > 0) {
      setDequeued({
        id: largePassenger[0],
        size: "large",
        type: "passenger"
      })
      setLargePassenger(largePassenger.slice(1))
    } else if (smallPassenger.length > 0) {
      setDequeued({
        id: smallPassenger[0],
        size: "small",
        type: "passenger"
      })
      setSmallPassenger(smallPassenger.slice(1))
    } else if (largeCargo.length > 0) {
      setDequeued({
        id: largeCargo[0],
        size: "large",
        type: "cargo"
      })
      setLargeCargo(largeCargo.slice(1))
    } else if (smallCargo.length > 0) {
      setDequeued({
        id: smallCargo[0],
        size: "small",
        type: "cargo"
      })
      setSmallCargo(smallCargo.slice(1))
    }
  }

  return (
    <div className="aircraft-queue">
      <div className="container">
        <button onClick={bootSystem}>
        {systemOn ? "Turn off System" : "Turn on System"}
        </button>
      </div>
      <div className={`container ${systemOn ? "" : "hidden"}`}>
        <select onChange={changeSize}>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>

        <select onChange={changeType}>
          <option value="passenger">Passenger</option>
          <option value="cargo">Cargo</option>
        </select>

        <button onClick={queueAircraft}>Enqueue Aircraft</button>
      </div>
      <div className={`container dequeue ${systemOn ? "" : "hidden"}`}>
        <button onClick={dequeueAircraft}>Dequeue Aircraft</button>
        <div>
          Last Aircraft Dequeued:
        </div>
        <div>
          {dequeued.size ? `id:${dequeued.id}, size:${dequeued.size}, type:${dequeued.type}` : "none"}
        </div>
      </div>
    </div>
  );
}

export default AircraftQueue;
