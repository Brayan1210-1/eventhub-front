import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Importación del esquema desde la ruta modular
import { loginSchema } from "@/modules/login/schemas/login.schema";

// Importación de tus átomos
import { Button } from "@/design/atoms/button";
import { Input } from "@/design/atoms/input";
import { Card } from "@/design/atoms/card";
import { Link } from "react-router-dom";

// Tipado estricto basado en el esquema de Zod
type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Aquí es donde mañana conectarás con tu API de Spring Boot
    console.log("Datos listos para EventHub:", data);

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text--color-secondary font-[IstokWeb] tracking-tight">
          EventHub
        </h1>
        <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-medium">
          iniciar sesion
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="nombre@eventhub.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex justify-end -mt-2 mb-8">
          <Link to="/recuperar"

            className="text-xs font-semibold text-color-primary hover:brightness-110 transition-all uppercase"
          >
            ¿Recuperar acceso?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-3 shadow-lg shadow-(--color-primary)/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Autenticando..." : "Entrar al Sistema"}
        </Button>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/registro"
              className="font-bold text(--color-secondary) hover:text--color-primary transition-colors underline decoration-2 underline-offset-4"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}