import React, { useEffect } from "react";
import Card from "../../components/elements/Card";
import { LoginForm } from "../../features/Auth/LoginForm";

const Login: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <LoginForm />
    </Card>
  );
};

export default Login;
