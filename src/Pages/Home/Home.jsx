import React from "react";

import useAuth from "../../Hooks/useAuth";

const Home = () => {

  const { user } = useAuth();

  return (

    <div>

      <h1
        className="
        mb-6
        text-2xl
        font-bold
        text-[#254593]
      "
      >
        Home
      </h1>

      <p>

        Welcome

        {" "}

        {user?.name}

      </p>

      <p>

        Role :

        {" "}

        {user?.roles.join(", ")}

      </p>

    </div>

  );
};

export default Home;