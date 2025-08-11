"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { pageConfig } from "@/shared/config/page.config";
import Link from "next/link";
import { login } from "../api/Login";

const loginSchema = z.object({
  username: z.string().min(1, "Username обязателен"),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(100, "Пароль слишком длинный"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await login(data.username, data.password);

      if (response.ok) {
        router.push(pageConfig.admin);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setErrorMessage("Произошла ошибка. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute bg-[#FF3C00] w-[400px] h-[400px] rounded-full left-[10%] top-[20%] blur-[100px] opacity-20" />
      <div className="absolute bg-[#EAEAEA] w-[300px] h-[300px] rounded-full right-[15%] bottom-[30%] blur-[80px] opacity-10" />

      <div className="relative z-30 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-hegval text-4xl font-bold text-white mb-2">
            Вход в админку
          </h1>
          <p className="text-white/60 font-light">
            Введите данные для доступа к панели администратора
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-[10px] p-8 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-white font-light text-sm"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="admin"
              className="w-full h-[52px] px-4 bg-white/5 border border-white/20 rounded-[5px] text-white placeholder:text-white/40 focus:border-[#FF3C00] focus:outline-none transition-colors duration-300"
            />
            {errors.username && (
              <p className="text-[#FF3C00] text-sm font-light">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-white font-light text-sm"
            >
              Пароль
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full h-[52px] px-4 bg-white/5 border border-white/20 rounded-[5px] text-white placeholder:text-white/40 focus:border-[#FF3C00] focus:outline-none transition-colors duration-300"
            />
            {errors.password && (
              <p className="text-[#FF3C00] text-sm font-light">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <div className="bg-[#FF3C00]/10 border border-[#FF3C00]/20 rounded-[5px] p-3">
              <p className="text-[#FF3C00] text-sm font-light">
                {errorMessage}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="sm:w-full w-full bg-[#FF3C00] hover:bg-[#FF3C00]/80 disabled:bg-[#FF3C00]/50 disabled:cursor-not-allowed font-light text-lg transition-colors duration-300"
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/40 text-sm font-light">
            Нет доступа? Обратитесь к администратору
          </p>
        </div>

        <div className="text-center mt-2">
          <Link
            href={pageConfig.home}
            className="text-white/40 text-sm font-light"
          >
            Вернуться на главную страницу
          </Link>
        </div>
      </div>

      <div className="noise mix-blend-soft-light" />
    </div>
  );
};
