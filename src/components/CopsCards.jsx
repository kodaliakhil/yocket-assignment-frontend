import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";

const initialCopsData = [
  {
    title: "Cop-1",
    city: "",
    vehicle: "",
    status: "Yet To Catch",
  },
  {
    title: "Cop-2",
    city: "",
    vehicle: "",
    status: "Yet To Catch",
  },
  {
    title: "Cop-3",
    city: "",
    vehicle: "",
    status: "Yet To Catch",
  },
];
let allCitynames;
let allVehicles;
const CopsCards = () => {
  const [copsData, setCopsData] = useState(initialCopsData);
  const [citiesData, setCitiesData] = useState([]);
  const [citynames, setCitynames] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  //   console.log(copsData);
  async function startSearch() {
    const reqData = copsData.map((i) => ({
      title: i.title,
      city: citiesData.filter((j) => j.name === i.city),
      vehicle: allVehicles.filter((j) => j.kind === i.vehicle),
      status: "Yet To Catch",
    }));

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/catchCriminal`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      }
    );
    const resCopsData = await response.json();
    console.log(resCopsData.reqData);
    const resData = resCopsData.reqData.map((i) => ({
      title: i.title,
      city: i.city[0].name,
      vehicle: i.vehicle[0].kind,
      status: i.status,
    }));
    setCopsData(resData);
  }

  function onChangeCitySelect(e, copTitle) {
    let selectedCities = [];
    const cD = copsData.map((i) => {
      if (i.title === copTitle) {
        i.city = e.target.value;
      }
      if (i.city != "") {
        selectedCities.push(i.city);
      }
      return i;
    });
    setCitynames(allCitynames.filter((i) => !selectedCities.includes(i)));
    setCopsData(cD);
  }

  async function onChangeVehicleSelect(e, copTitle) {
    let selectedVehicles = [];
    const cD = copsData.map((i) => {
      if (i.title === copTitle) {
        i.vehicle = e.target.value;
      }
      if (i.vehicle != "") {
        selectedVehicles.push(i.vehicle);
      }
      return i;
    });
    setVehiclesData(
      allVehicles.filter(
        (i) => i.count > selectedVehicles.filter((j) => j === i.kind).length
      )
    );

    setCopsData(cD);
  }

  useEffect(() => {
    // async function assignRandomHideout() {
    //   const response = await fetch("http://localhost:5000/assignRandomHideout");
    //   const hideout = await response.json();
    //   console.log(hideout);
    // }
    async function getCityData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/getCityData`
      );
      const cities = await response.json();
      setCitiesData(cities.cityData);
      allCitynames = cities.cityData.map((i) => i.name);
      setCitynames(allCitynames);
    }
    async function getVehicleData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/getVehicles`
      );
      const vehicles = (await response.json()).vehicles;
      setVehiclesData(vehicles);
      allVehicles = vehicles;
    }
    // assignRandomHideout();
    getCityData();
    getVehicleData();
  }, []);
  return (
    <div>
      <CardGroup>
        {copsData?.map((cop) => {
          return (
            <Card key={cop.title}>
              <Card.Img variant="top" src={`/${cop.title}.png`} />
              <Card.Body>
                <Card.Title>{cop.title}</Card.Title>
                <Card.Text
                  className="d-flex align-items-center "
                  style={{ gap: 20 }}
                >
                  <span>City:</span>
                  {/*//////////////////////////////////////        SELECT CITY        /////////////////////////////////////////*/}
                  {cop.city != "" ? (
                    cop.city
                  ) : (
                    <Form.Select
                      onChange={(e) => onChangeCitySelect(e, cop.title)}
                    >
                      <option>Select City</option>
                      {citynames.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Select>
                  )}

                  {/*//////////////////////////////////////        SELECT CITY        /////////////////////////////////////////*/}
                </Card.Text>
                <Card.Text
                  className="d-flex align-items-center "
                  style={{ gap: 20 }}
                >
                  <span>Vehicle:</span>
                  {/*//////////////////////////////////////        SELECT VEHICLE        /////////////////////////////////////////*/}
                  {cop.vehicle != "" ? (
                    cop.vehicle
                  ) : (
                    <Form.Select
                      onChange={(e) => onChangeVehicleSelect(e, cop.title)}
                    >
                      <option>Select Vehicle</option>
                      {vehiclesData.map((vehicle) => (
                        <option key={vehicle.kind} value={vehicle.kind}>
                          {vehicle.kind}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {/*//////////////////////////////////////        SELECT VEHICLE        /////////////////////////////////////////*/}
                </Card.Text>
                <Card.Text
                  className="d-flex align-items-center "
                  style={{ gap: 20 }}
                ></Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{cop.status}</small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardGroup>
      <div className="d-flex justify-content-end">
        <Button onClick={startSearch}>Start Search</Button>
      </div>
    </div>
  );
};

export default CopsCards;
