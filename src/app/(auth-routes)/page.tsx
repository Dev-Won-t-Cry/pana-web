"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import LoginSchema from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Switch } from "@/components/ui/switch"

export default function Home() {
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (result?.error) {
      toast({
        title: 'Erro',
        description: 'Falha ao logar',
        variant: 'destructive',
      })
      return
    }

    router.replace('/admin')
  };

  return (
    <main className="h-full w-full flex justify-center items-center bg-login-background">
      <div className="flex flex-col space-y-4">
        <div className="px-16 py-10 bg-login-box border-black border-2 shadow-2xl">
          <p className="text-8xl text-login-title text-center">PANA</p>
        </div>
        <div className="py-10 bg-login-box border-black border-2 justify-center items-center flex flex-col">
          <div className="flex flex-col space-y-4 w-80">
            <Button className="bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <FaGoogle className="w-6 h-6" />
              <span className="w-9/12">Continuar com Google</span>
            </Button>
            <Button className="bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <FaFacebook className="w-6 h-6" />
              <span className="w-9/12">Continuar com Facebook</span>
            </Button>
            <Button className="flex flex-row space-x-2 bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <span>Continuar com um número de telefone</span>
            </Button>
          </div>

          <div className="bg-black my-8 w-11/12 h-0.5"></div>

          <div className="px-16">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail ou nome de usuário</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white border-2 border-black rounded-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="bg-white border-2 border-black rounded-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row space-x-2 items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-2 border-black data-[state=checked]:bg-login-button data-[state=unchecked]:bg-login-button"
                        />
                      </FormControl>
                      <FormLabel>Lembrar de mim</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col justify-center items-center space-y-3">
                  <Button
                    type="submit"
                    className="bg-login-button rounded-full border-2 border-black uppercase text-black text-lg px-8 py-6 hover:bg-login-buttonHover"
                  >
                    Entrar
                  </Button>
                  <Link href="forgot" className="underline text-sm">
                    Esqueceu sua senha?
                  </Link>
                  <p className="text-sm">
                    Não tem uma conta?{" "}
                    <Link href="register" className="underline">
                      Inscreva-se no PANA
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
