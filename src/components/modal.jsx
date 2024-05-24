/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-17 13:09:05
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-17 13:22:37
 * @Description: file content
 */
import React, { useState } from "react";
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker
} from "react-router-dom";
import { Modal, Button } from "antd";
// function usePrompt(message, { beforeUnload } = {}) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleConfirm = () => {
//     blocker.allow();
//     setShow(false);
//   };
//   let blocker = useBlocker(
//     React.useCallback(() => {
//       setShow(true);
//       return true;
//     }, [])
//   );
//   let prevState = React.useRef(blocker.state);
//   React.useEffect(() => {
//     if (blocker.state === "blocked") {
//       blocker.reset();
//     }
//     prevState.current = blocker.state;
//   }, [blocker]);
//   useBeforeUnload(
//     React.useCallback(
//       (event) => {
//         if (beforeUnload && blocker.state === "blocked") {
//           event.preventDefault();
//           event.returnValue = message;
//         }
//       },
//       [message, beforeUnload, blocker.state]
//     ),
//     { capture: true }
//   );
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Are you sure?</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{message}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleConfirm}>
//           Confirm
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
// export default function Prompt({ when, message, ...props }) {
//   usePrompt(when ? message : false, props);
//   return null;
// }

export function usePrompt(onLocationChange, hasUnsavedChanges) {
  const blocker = useBlocker(hasUnsavedChanges ? onLocationChange : false);
  const prevState = useRef(blocker.state);
​
  useEffect(() => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
    prevState.current = blocker.state;
  }, [blocker]);
}