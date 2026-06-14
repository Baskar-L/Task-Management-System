import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  jwtDecode,
} from "jwt-decode";

const INACTIVITY_LIMIT =
  5000; // 5 sec testing

export default function AuthSessionManager({
  onSessionExpired,
}) {

  const timer =
    useRef(null);

  const [token, setToken] =
    useState(
      sessionStorage.getItem(
        "token"
      )
    );

  useEffect(() => {

    const handleLogin =
      () => {

        setToken(
          sessionStorage.getItem(
            "token"
          )
        );

      };

    window.addEventListener(
      "loginSuccess",
      handleLogin
    );

    return () => {

      window.removeEventListener(
        "loginSuccess",
        handleLogin
      );

    };

  }, []);

  useEffect(() => {

    if (!token) return;

    console.log(
      "SESSION MANAGER STARTED"
    );

    const logout =
      () => {

        console.log(
          "SESSION EXPIRED"
        );

        onSessionExpired();

      };

    try {

      const decoded =
        jwtDecode(token);

      const expiresAt =
        decoded.exp * 1000;

      const remaining =
        expiresAt - Date.now();

      if (remaining <= 0) {

        logout();

        return;

      }

      const jwtTimer =
        setTimeout(
          logout,
          remaining
        );

      const resetTimer =
        () => {

          clearTimeout(
            timer.current
          );

          timer.current =
            setTimeout(
              logout,
              INACTIVITY_LIMIT
            );

        };

      const events = [
        "mousemove",
        "keydown",
        "click",
        "scroll",
        "touchstart",
      ];

      events.forEach(
        (event) =>
          window.addEventListener(
            event,
            resetTimer
          )
      );

      resetTimer();

      return () => {

        clearTimeout(
          timer.current
        );

        clearTimeout(
          jwtTimer
        );

        events.forEach(
          (event) =>
            window.removeEventListener(
              event,
              resetTimer
            )
        );

      };

    } catch {

      logout();

    }

  }, [
    token,
    onSessionExpired,
  ]);

  return null;

}



// import { useEffect, useRef } from "react";
// import { jwtDecode } from "jwt-decode";

// // const INACTIVITY_LIMIT =
// //   30 * 60 * 1000;


//   const INACTIVITY_LIMIT = 5000; // 5 seconds testing

// export default function AuthSessionManager({
//   onSessionExpired,
// }) {

//   const timer =
//     useRef(null);

//   useEffect(() => {

//     const token =
//       sessionStorage.getItem(
//         "token"
//       );

//     if (!token) return;

//     const logout = () => {

//       onSessionExpired();

//     };

//     /* JWT EXPIRY CHECK */

//     try {

//       const decoded =
//         jwtDecode(token);

//       const expiresAt =
//         decoded.exp * 1000;

//       const remaining =
//         expiresAt - Date.now();

//       if (remaining <= 0) {

//         logout();

//         return;

//       }

//       const jwtTimer =
//         setTimeout(
//           logout,
//           remaining
//         );

//       /* INACTIVITY CHECK */

//       const resetTimer =
//         () => {

//           clearTimeout(
//             timer.current
//           );

//           timer.current =
//             setTimeout(
//               logout,
//               INACTIVITY_LIMIT
//             );

//         };

//       const events = [
//         "mousemove",
//         "keydown",
//         "click",
//         "scroll",
//         "touchstart",
//       ];

//       events.forEach(
//         (event) =>
//           window.addEventListener(
//             event,
//             resetTimer
//           )
//       );

//       resetTimer();

//       return () => {

//         clearTimeout(
//           timer.current
//         );

//         clearTimeout(
//           jwtTimer
//         );

//         events.forEach(
//           (event) =>
//             window.removeEventListener(
//               event,
//               resetTimer
//             )
//         );

//       };

//     } catch {

//       logout();

//     }

//   }, [onSessionExpired]);

//   return null;
// }