import React from "react";

const Unauthorized = () => {

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >

      <div className="text-center">

        <h1
          className="
            text-4xl
            font-bold
            text-red-500
          "
        >
          403
        </h1>

        <p className="mt-2">

          Unauthorized Access

        </p>

      </div>

    </div>

  );

};

export default Unauthorized;