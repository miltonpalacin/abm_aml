import { LogItemCache } from "@/app/abm/helper/Log";
import React, { useEffect, useRef } from "react";

interface IProps {
  logs: Array<LogItemCache>;
}

const logEndRef = React.createRef<HTMLDivElement>()

const scrollLogToBottom = () => {
  if (logEndRef.current) {
     logEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
};

const LogList: React.FunctionComponent<IProps> = props => {
  return (
    <div className="list-log p-2">

      <h5>Eventos de la simulación</h5>

      <ul className="list-group overflow-auto" >
        {props.logs.length > 0 ? (
          props.logs.map(i => (
            <li key={i.order} className={`list-group-item ${i.type}`}>
              {i.message}
            </li>
          ))
        ) : (
          <li style={{ float: "left", clear: "both" }} className="list-group-item">
            . . .
          </li>
        )}
        <div ref={logEndRef} />
      </ul>
    </div >
  );
};
export { LogList, scrollLogToBottom };