import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedCars = localStorage.getItem("highlightedCars");
    if (storedCars) {
      setHighlightedCars(JSON.parse(storedCars));
    }
  }, []);

  const removeCar = (carId) => {
    const updatedCars = highlightedCars.filter((car) => car.Cid !== carId);
    setHighlightedCars(updatedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(updatedCars));
  };

  const clearAllCars = () => {
    setHighlightedCars([]);
    localStorage.removeItem("highlightedCars");
    setModalVisible(false);
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <Container className="mt-4">
      <div className="header" style={{ padding: "10px 0", backgroundColor: "#f8f9fa", marginBottom: "20px", textAlign: "left" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "2rem", margin: 0 }}>
          Highlighted Cars
        </h2>
      </div>

      <Row className="mb-4">
        {highlightedCars.length === 0 ? (
          <Col>
            <p style={{ textAlign: "center" }}>No highlighted cars yet.</p>
          </Col>
        ) : (
          highlightedCars.map((car) => (
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
                  <Button variant="danger" className="w-100" onClick={() => removeCar(car.Cid)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {highlightedCars.length > 0 && (
        <Button variant="danger" className="w-100" onClick={toggleModal}>
          Clear All
        </Button>
      )}

      <Modal show={modalVisible} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Clear All Highlighted Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear all highlighted cars?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={clearAllCars}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HighlightedCars;
