import { useNavigate } from "react-router-dom";
import Card from "../../components/elements/Card";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../stores/authStore";
import * as yup from "yup";
import { EMAIL_REG } from "../../constants/regex";
import { STORAGE_KEYS } from "../../constants/storage";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const savedUsername = localStorage.getItem(STORAGE_KEYS.SAVED_USERNAME) || "";

  const schema = yup.object({
    username: yup
      .string()
      .trim()
      .required(t("validations.required", { field: t("labels.username") }))
      .email(t("validations.email"))
      .matches(EMAIL_REG, t("validations.email")),
    password: yup
      .string()
      .required(t("validations.required", { field: t("labels.password") })),
    rememberMe: yup.boolean(),
  });

  return (
    <Card>
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("labels.auth.login.title")}
          </h1>
          <p className="text-gray-600">{t("labels.auth.login.description")}</p>
        </div>

        <form>
          
        </form>
      </div>
    </Card>
  );
};

export default Login;
