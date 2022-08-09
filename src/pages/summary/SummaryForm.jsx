import { memo, useState, useCallback, useMemo } from "react";
import { Button, Form, Popover, OverlayTrigger } from "react-bootstrap";

import { orderPhases } from "../../constants";
import { useOrderDetails } from '../../context/orderDetails';

const SummaryForm = () => {
  const [getIsUserAgreeTC, setIsUserAgreeTC] = useState(false);
  const [ , , setOrderPhaseFn] = useOrderDetails();

  const handleCheckboxChange = useCallback((e) => {
    // console.log(e.target.checked);
    setIsUserAgreeTC(e.target.checked);
  }, []);

  const popover = useMemo(
    () => (
      <Popover id="popover-basic">
        <Popover.Body>No ice cream will actually be delivered</Popover.Body>
      </Popover>
    ),
    []
  );

  const getCheckBoxLabel = useMemo(
    () => (
      <div>
        I agree to
        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover}>
          <span style={{ color: "blue" }}>terms and conditions</span>
        </OverlayTrigger>
      </div>
    ),
    [popover]
  );

  const handleConfirmOrderClick = () => {
    setOrderPhaseFn(orderPhases.COMPLETE);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          id="tAndC"
          label={getCheckBoxLabel}
          checked={getIsUserAgreeTC}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!getIsUserAgreeTC} onClick={handleConfirmOrderClick}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default memo(SummaryForm);
