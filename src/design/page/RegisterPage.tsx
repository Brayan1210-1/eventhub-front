import { Navbar } from "@/design/molecules/navbar";
import { RegisterSection } from "@/design/organism/RegisterSection";

export function RegisterPage() {
 

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow">
        <RegisterSection />
      </main>

      {/* 3. Aquí iría la molécula del Footer más adelante */}
    </div>
  );
}