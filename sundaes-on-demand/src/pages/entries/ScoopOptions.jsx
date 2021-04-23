import React from "react";
import Col from "react-bootstrap/Col";
import { API } from "./../../constants";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

/**
 * @author
 * @function ScoopOptions
 **/

const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`${API}/${imagePath}`}
        name={name}
        alt={`${name} chip`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            name={name}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
