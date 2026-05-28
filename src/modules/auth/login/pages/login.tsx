import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginType } from "../schemas/login.schema";
import { Input } from "@/design/atoms/input";
import { Button } from "@/design/atoms/button";
import { Card } from "@/design/atoms/card";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import FormError from "@/design/molecules/FormError";
import { getApiErrorMessage } from "@/utils/errorController";

export function LoginForm() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    mutate(data, {
      onError: (error) => {

        const errorMessage = getApiErrorMessage(error);

        setError('root', {
          type: 'manual',
          message: errorMessage,
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa a tu cuenta de EventHub
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <FormError message={errors.root?.message} type="global" />

          <Input
            label="Correo Electrónico"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Contraseña"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isPending}
          >
            {isPending ? 'Iniciando sesión...' : 'Ingresar'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}