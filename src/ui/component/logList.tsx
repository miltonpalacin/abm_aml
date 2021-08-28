import { LogItemCache } from "@/app/abm/helper/Log";
import React, { useEffect, useRef } from "react";

interface IProps {
  logs: Array<LogItemCache>;
}


//const messagesEndRef = React.useRef<HTMLDivElement>(null);
const logEndRef = React.createRef<HTMLDivElement>()

const scrollLogToBottom = () => {
  if (logEndRef.current) {
    logEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
};



// const scrollToBottom = () => {
//   messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
// }

// useEffect(scrollToBottom, [messages]);

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

// return (
//   <div className="user-table">
//     <table>
//       <thead>
//         <tr>
//           <th>Eventos de la simulación</th>
//         </tr>
//       </thead>
//       <tbody>
//         {props.logs.length > 0 ? (
//           props.logs.map(i => (
//             <tr key={i.order}>
//               <td>{i.message}</td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={1}>.........</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// );
// };
