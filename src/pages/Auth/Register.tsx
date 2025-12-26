import React from "react";
import { RegisterForm } from "../../features/Auth/RegisterForm";
import Card from "../../components/elements/Card";

const Register: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <RegisterForm />
    </Card>
  );
};

export default Register;
