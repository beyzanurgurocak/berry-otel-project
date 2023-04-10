import { Row, Col } from "reactstrap";
import * as Icon from "react-feather";

const Header = () => {
  return (
    <div className="w-100 bg-secondary p-4 text-white">
      <Row className="justify-content-between align-items-center">
        <Col xs={12} sm={4} md={3} className="d-flex align-items-center">
          <Icon.Award size={25} />
          <h4 className="text-center ml-2 mb-0">Berry Hotel</h4>
        </Col>
        <Col xs={12} sm={4} md={3} className="d-flex justify-content-end align-items-center">
          <Icon.User size={25} />
          <strong className="ml-2">Kullanıcı</strong>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
