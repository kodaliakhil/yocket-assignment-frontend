import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

const CriminalCard = () => {
  const [hideoutData, setHideoutData] = useState();
  useEffect(() => {
    async function getHideoutData() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignRandomHideout`);
      const hideout = await response.json();
      setHideoutData(hideout.criminalHideoutPlace);
    }
    getHideoutData();
  }, []);
  return (
    <Card className="p-3">
      <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
        <Image className="col-12 col-md-3" src="/criminal.png" thumbnail width={300} />
        <div className="col-12 col-md-8">
          <Card.Title>CRIMINAL DATA</Card.Title>
          <Card.Text>Hiding At: {hideoutData?.name}</Card.Text>
          <Card.Text>Distance: {hideoutData?.distance}</Card.Text>
        </div>
      </div>
    </Card>
  );
};

export default CriminalCard;
