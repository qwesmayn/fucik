import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="relative">
      <section className="pt-[72px] pb-[170px] max-w-[1800px] mx-auto">
        <LoginForm />
      </section>
    </main>
  );
}
