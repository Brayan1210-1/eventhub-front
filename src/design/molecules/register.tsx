import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterType } from "@/modules/register/schemas/register.schema";
import { Input } from "@/design/atoms/input";
import { Button } from "@/design/atoms/button";
import { Card } from "@/design/atoms/card";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterType) => {
    console.log("Enviando a EventHub API:", data);
  };

  return (
  
    <Card className="w-full max-w-lg mx-auto">
      <header className="text-center mb-6">
        <h1>Crear Cuenta</h1>
        <p>Únete a la plataforma de eventos más técnica.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Input
            label="Nombre"
            placeholder="Tu nombre"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Apellido"
            placeholder="Tu apellido"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

     
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="usuario@ejemplo.com"
          error={errors.email?.message}
          {...register("email")}
        />

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Input
            label="Documento"
            placeholder="CC / TI / CE"
            error={errors.document?.message}
            {...register("document")}
          />
          <Input
            label="Teléfono"
            placeholder="3001234567"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>


        <Input
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarme"}
          </Button>
        </div>
      </form>

      <footer className="mt-6 text-center">
        <p className="text-sm">
          ¿Ya tienes una cuenta? <a>Inicia sesión aquí</a>
        </p>
      </footer>
    </Card>
  );
}