import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Call Us 017....</h5>
            <p>0123 567 789</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Head quater</h5>
            <p>0123 567 789</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-fax"></i>
            </div>
            <h5>Fax</h5>
            <p>0123 567 789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
