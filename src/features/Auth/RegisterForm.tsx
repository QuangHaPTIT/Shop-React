import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { RegisterFormData } from "../../types/auth";
import Input from "../../components/elements/Input";
import Checkbox from "../../components/elements/Checkbox";
import Button from "../../components/elements/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/route";

export const RegisterForm: React.FC = () => {
    const { t } = useTranslation();

  const schema = yup.object({
    username: yup
      .string()
      .required(
        t("validations.required", { field: t("labels.auth.register.username") })
      ),
    email: yup
      .string()
      .required(
        t("validations.required", { field: t("labels.auth.register.email") })
      )
      .email(t("validations.email")),
    password: yup
      .string()
      .required(
        t("validations.required", { field: t("labels.auth.register.password") })
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("validations.password_not_match"))
      .required(
        t("validations.required", {
          field: t("labels.auth.register.confirmPassword"),
        })
      ),
    agreeTerms: yup
      .boolean()
      .oneOf([true], t("validations.must_accept_terms"))
      .required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onsubmit = async (data: RegisterFormData) => {
    alert(JSON.stringify(data));
  };
  return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("labels.auth.register.title")}
          </h1>
          <p className="text-gray-600 text-sm">
            {t("labels.auth.register.description")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  label={t("labels.auth.register.username")}
                  size="lg"
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    name: "username",
                    type: "text",
                    placeholder: t("labels.auth.register.usernamePlaceholder"),
                    autocomplete: "username",
                    onBlur: field.onBlur,
                  }}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  label={t("labels.auth.register.email")}
                  size="lg"
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    name: "email",
                    type: "email",
                    placeholder: t("labels.auth.register.emailPlaceholder"),
                    autocomplete: "email",
                    onBlur: field.onBlur,
                  }}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  label={t("labels.auth.register.password")}
                  size="lg"
                  value={field.value}
                  onChange={field.onChange}
                  showPasswordToggle={true}
                  inputProps={{
                    name: "password",
                    type: "password",
                    placeholder: t("labels.auth.register.passwordPlaceholder"),
                    autocomplete: "new-password",
                    onBlur: field.onBlur,
                  }}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  label={t("labels.auth.register.confirmPassword")}
                  size="lg"
                  value={field.value}
                  onChange={field.onChange}
                  showPasswordToggle={true}
                  inputProps={{
                    name: "confirmPassword",
                    type: "password",
                    placeholder: t(
                      "labels.auth.register.confirmPasswordPlaceholder"
                    ),
                    autocomplete: "new-password",
                    onBlur: field.onBlur,
                  }}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </>
            )}
          />

          <div>
            <div className="[&_input:checked]:bg-blue-400 [&_input:checked]:border-blue-400 [&_svg]:text-white">
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checkboxProps={{ name: "agreeTerms" }}
                    value={field.value}
                    onChange={field.onChange}
                    label={t("labels.auth.register.agreeTerms")}
                  />
                )}
              />

              <p className="text-sm text-gray-600 mt-1 ml-7">
                <a
                  href="#"
                  className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
                >
                  {t("labels.auth.register.termsAndConditions")}
                </a>
              </p>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-red-600 mt-1 ml-7">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="filled"
            color="primary"
            size="lg"
            block={true}
            loading={false}
            className="mt-6 !bg-blue-400 hover:!bg-blue-500 disabled:!bg-blue-300"
          >
            {t("labels.auth.register.submit")}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-color text-gray-500">
                {t("labels.auth.register.or")}
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            {t("labels.auth.register.hasAccount")}{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
            >
              {t("labels.auth.register.login")}
            </Link>
          </p>
        </form>
      </div>
  );
}