import React from "react";
import CustomButton from "../components/Button";
import CalculateIcon from "@mui/icons-material/Calculate";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { TextField } from "@mui/material";
const CIForm = () => {
  const [validYearsHold, setValidYearsHold] = useState(true);
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [yearsInvestment, setYearsInvestment] = useState(1);
  const [yearsHold, setYearsHold] = useState(1);
  const [rate, setRate] = useState(5);
  const [formValues, setFormValues] = useState({
    yearsHold: {
      error: false,
    },
    yearsInvestment: {
      error: false,
    },
  });
  const calculateInterest = () => {
    let amount = 0;
    for (let i = 1; i <= yearsInvestment; i++) {
	  amount += principleAmount;
      let interest = (amount * rate) / 100;
      amount += interest;
    }
	amount *= Math.pow((1+(rate/100)),(yearsHold-yearsInvestment))
	console.log(amount)
  };
  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rate = event.target.value;
    let [number, decimal] = rate.split(".");
    if (number.length > 5) {
      number = number.substring(0, number.length - 1);
    }
    if (!!decimal && decimal.length > 3) {
      decimal = decimal.substring(0, decimal.length - 1);
    }
    setRate(+(number + "." + (decimal || 0)));
  };
  const handleYearsStayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({
      ...formValues,
      yearsHold: {
        ...formValues[yearsHold],
        error: false,
      },
    });
    const years = event.target.value;
    if (years === "") {
      setYearsHold(years);
    } else if (isNaN(years)) {
      setFormValues({
        ...formValues,
        yearsHold: {
          ...formValues[yearsHold],
          error: true,
          errorMessage: "input should be an Integer",
        },
      });
    } else if (+years >= 1 && +years < 101) {
      setYearsHold(+years);
    } else {
      setFormValues({
        ...formValues,
        yearsHold: {
          ...formValues[yearsHold],
          error: true,
          errorMessage: "The year must be between 1 and 100",
        },
      });
    }
  };
  const handleYearsInvest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      yearsInvestment: {
        ...formValues[yearsInvestment],
        error: false,
      },
    });
    const years = event.target.value;
    if (years === "") {
      setYearsInvestment(years);
    } else if (isNaN(years)) {
      setFormValues({
        ...formValues,
        yearsInvestment: {
          ...formValues[yearsInvestment],
          error: true,
          errorMessage: "input should be an Integer",
        },
      });
    } else if (+years >= 1 && +years < 101) {
      setYearsInvestment(+years);
    } else {
      setFormValues({
        ...formValues,
        yearsInvestment: {
          ...formValues[yearsInvestment],
          error: true,
          errorMessage: "The year must be between 1 and 100",
        },
      });
    }
  };
  const handlePrincipleAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrincipleAmount(+event.target.value);
  };
  return (
    <Form className="form">
      <Row className="mb-3">
        <h1>Compound Interest Calculator</h1>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAmount">
          <InputLabel htmlFor="standard-adornment-amount">
            Amount you want to Invest
          </InputLabel>
          <Row>
            <Form.Group as={Col} controlId="label">
              <Input
                id="principle_amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                inputProps={{ value: principleAmount }}
                onChange={handlePrincipleAmount}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="frequency">
              <RadioGroup
                row
                name="row-radio-buttons-group"
                defaultValue="yearly"
                id="frequency"
              >
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="yearly"
                  control={<Radio />}
                  label="Yearly"
                />
              </RadioGroup>
            </Form.Group>
          </Row>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <InputLabel htmlFor="standard-adornment-amount">
          Number of years you want to Invest
        </InputLabel>
        <TextField
          id="no_of_yrs_invest"
          //type='number'
          inputProps={{ value: yearsInvestment }}
          //startAdornment={<InputAdornment position='start'>yrs</InputAdornment>}
          onChange={handleYearsInvest}
          error={formValues.yearsInvestment.error}
          helperText={
            formValues.yearsInvestment.error &&
            formValues.yearsInvestment.errorMessage
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <InputLabel htmlFor="standard-adornment-amount">
          Number of years you want to stay Invested for
        </InputLabel>
        <TextField
          id="no_of_yrs_stay"
          //type='number'
          inputProps={{ value: yearsHold }}
          onChange={handleYearsStayChange}
          //startAdornment={<InputAdornment position='start'>yrs</InputAdornment>}
          error={formValues.yearsHold.error}
          helperText={
            formValues.yearsHold.error && formValues.yearsHold.errorMessage
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <InputLabel htmlFor="standard-adornment-amount">
          Annual Rate of Interest
        </InputLabel>
        <Input
          id="rate"
          type="number"
          inputProps={{ step: 0.1, maxLength: 7, min: 0, value: rate }}
          onChange={handleRateChange}
          required={true}
          startAdornment={<InputAdornment position="start">%</InputAdornment>}
        />
      </Form.Group>

      <CustomButton
        name="Calculate"
        properties={{
          variant: "contained",
          endIcon: <CalculateIcon />,
          onClick: calculateInterest,
        }}
      />
    </Form>
  );
};
export default CIForm;
