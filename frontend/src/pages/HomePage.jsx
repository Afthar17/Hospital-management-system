import React from "react";
import { useUserStore } from "../store/useUserStore";
import Admin from "../components/Admin";
import Doctor from "../components/Doctor";
import Receptions from "../components/Receptions";
import Lab from "../components/Lab";

const HomePage = () => {
  const { user } = useUserStore();
  switch (user.role) {
    case "admin":
      return <Admin />;
    case "doctor":
      return <Doctor />;
    case "reception":
      return <Receptions />;
    case "lab":
      return <Lab />;
    default:
      return window.location.reload();
  }
};

export default HomePage;
