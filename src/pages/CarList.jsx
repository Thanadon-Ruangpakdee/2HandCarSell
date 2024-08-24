import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
  InputGroup,
} from "react-bootstrap";
import carData from "../data/taladrod-cars.json";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    setCars(carData.Cars);

    const storedHighlightedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  const brands = useMemo(() => {
    return ["All", ...new Set(carData.Cars.map((car) => car.NameMMT.split(" ")[0]))];
  }, [carData.Cars]);

  const filterCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesBrand = selectedBrand === "All" || car.NameMMT.split(" ")[0] === selectedBrand;
      const matchesSearch = car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [cars, selectedBrand, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const toggleHighlight = (car) => {
    setHighlightedCars((prev) => {
      const isHighlighted = prev.some((c) => c.Cid === car.Cid);
      const updatedHighlightedCars = isHighlighted
        ? prev.filter((highlightedCar) => highlightedCar.Cid !== car.Cid)
        : [...prev, car];

      localStorage.setItem("highlightedCars", JSON.stringify(updatedHighlightedCars));
      return updatedHighlightedCars;
    });
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
          <InputGroup className="w-100">
            <Form.Control
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="dark" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <ButtonGroup className="mb-4 d-flex flex-wrap">
        {brands.map((brand) => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? "dark" : "outline-dark"}
            onClick={() => setSelectedBrand(brand)}
            className="mb-2"
          >
            {brand}
          </Button>
        ))}
      </ButtonGroup>

      <Row>
        {filterCars.map((car) => (
          <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={car.Img300} alt={car.Model} />
              <Card.Body>
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text>
                  Price: {car.Prc} <br />
                  Year: {car.Yr} <br />
                  Province: {car.Province} <br />
                  Views: {car.PageViews}
                </Card.Text>
                <Button
                  variant={highlightedCars.some((c) => c.Cid === car.Cid) ? "warning" : "success"}
                  onClick={() => toggleHighlight(car)}
                >
                  {highlightedCars.some((c) => c.Cid === car.Cid) ? "UnHighLight" : "HighLight"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarList;
