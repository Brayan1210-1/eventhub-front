import { RegisterForm } from "@/design/molecules/register";

export function RegisterSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-color-brand-bg">

      <div className="w-full max-w-xl animate-in fade-in zoom-in duration-500">
        <RegisterForm />
      </div>
    </section>
  );
}