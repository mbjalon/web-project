import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return <div></div>;
};

export default LandingPage;
