import React from "react";
import Order from "./Order";

const Accordion = ({ username, children }) => {
  return (
    <div className="accordion mb-3" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + children[0]._id}
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            {username}
          </button>
        </h2>
        <div
          id={children[0]._id}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {children.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
