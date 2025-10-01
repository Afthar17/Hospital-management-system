// pages/Lab.jsx
import React from "react";
import { useUserStore } from "../store/useUserStore";
import LabPatients from "../pages/LabPatients";

const Lab = () => {
  const { user } = useUserStore();
  if (!user) return <div>You are not authenticated</div>;

  return (
    <div className="flex flex-col mx-2 md:mx-10 lg:mx-20">
      <h1 className="text-3xl font-bold text-center text-slate-800 mt-5">
        {`Welcome lab tech, ${user.name}`}
      </h1>
      <LabPatients />
    </div>
  );
};

export default Lab;
