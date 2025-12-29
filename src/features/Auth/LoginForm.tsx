import { useTranslation } from "react-i18next";
import Button from "../../components/elements/Button";
import type { LoginFormData } from "../../types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_REG } from "../../constants/regex";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { STORAGE_KEYS } from "../../constants/storage";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants/route";
import Input from "../../components/elements/Input";
import Checkbox from "../../components/elements/Checkbox";


export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const savedUsername = localStorage.getItem(STORAGE_KEYS.SAVED_USERNAME) || "";

  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .required(
        t("validations.required", { field: t("labels.auth.login.username") })
      )
      .email(t("validations.email"))
      .matches(EMAIL_REG, t("validations.email")),
    password: yup
      .string()
      .required(
        t("validations.required", { field: t("labels.auth.login.password") })
      ),
    rememberMe: yup.boolean().default(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: savedUsername,
      password: "",
      rememberMe: !!savedUsername,
    },
  });

  useEffect(() => {
    if (savedUsername) {
      setValue("email", savedUsername);
      setValue("rememberMe", true);
    }
  }, [savedUsername, setValue]);

  const onSubmit = async (data: LoginFormData) => {
    console.log("data login", data);
    try {
      await login(
        {
          email: data.email,
          password: data.password,
        },
        data.rememberMe
      );

      toast.success(t("labels.auth.login.success"));
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const errorMessage =
        typeof error === "string" ? error : t("errors.login_failed");

      setError("root", {
        type: "manual",
        message: errorMessage,
      });

      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("labels.auth.login.title")}
        </h1>
        <p className="text-gray-600 text-sm">
          {t("labels.auth.login.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <Input
                label={t("labels.auth.login.username")}
                size="lg"
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  name: "email",
                  type: "text",
                  placeholder: t("labels.auth.login.usernamePlaceholder"),
                  autocomplete: "email",
                  onBlur: field.onBlur,
                }}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <Input
                label={t("labels.auth.login.password")}
                size="lg"
                value={field.value}
                onChange={field.onChange}
                showPasswordToggle={true}
                inputProps={{
                  name: "password",
                  type: "password",
                  placeholder: t("labels.auth.login.passwordPlaceholder"),
                  autocomplete: "current-password",
                  onBlur: field.onBlur,
                }}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="flex items-center justify-between">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <div className="[&_input:checked]:bg-blue-400 [&_input:checked]:border-blue-400 [&_svg]:text-white">
                <Checkbox
                  checkboxProps={{
                    name: "rememberMe",
                    id: "rememberMe",
                    className: "!checked:bg-blue-400 !checked:border-blue-400",
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  label={t("labels.auth.login.rememberMe")}
                />
              </div>
            )}
          />
          <a
            href="#"
            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            {t("labels.auth.login.forgotPassword")}
          </a>
        </div>

        {/* Root Error Message */}
        {errors.root && (
          <p className="text-sm text-red-600 mt-1">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          variant="filled"
          color="primary"
          size="lg"
          block={true}
          loading={false}
          className="mt-6 !bg-blue-400 hover:!bg-blue-500 disabled:!bg-blue-300"
        >
          {t("labels.auth.login.submit")}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-bg-color text-gray-500">
              {t("labels.auth.login.or")}
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          {t("labels.auth.login.noAccount")}{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
          >
            {t("labels.auth.login.signUp")}
          </Link>
        </p>
      </form>
    </div>
  );
};
