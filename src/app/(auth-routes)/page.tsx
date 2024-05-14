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
import { FaFacebook, FaGoogle, FaSpinner } from "react-icons/fa";
import { Switch } from "@/components/ui/switch"
import { useMutation, useQuery } from "react-query";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const login = async (values: any) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (result?.error) return Promise.reject(result.error)

    return result
  }

  const onSubmit = useMutation(login, {
    onError: () => {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.replace('/quadros')
    }
  });

  return (
    <main className="flex flex-col min-h-full p-16 justify-center items-center">
      <div className="flex flex-col space-y-4">
        <div className="px-16 py-10 bg-black/30 rounded-5xl">
          <Image src="/static/images/pana.png" width={300} height={300} alt="" />
        </div>
        <div className="py-10 bg-black/30 rounded-5xl justify-center items-center flex flex-col">
          <div className="flex flex-col space-y-4 w-80">
            <Button className="bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <span className="w-9/12">Continuar com Google</span>
            </Button>
            <Button className="bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <span className="w-9/12">Continuar com Facebook</span>
            </Button>
            <Button className="flex flex-row space-x-2 bg-white hover:bg-gray-400 text-black rounded-full border-2 border-black">
              <span>Continuar com um número de telefone</span>
            </Button>
          </div>

          <div className="bg-black my-8 w-11/12 h-0.5"></div>

          <div className="px-16 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => onSubmit.mutate(values))} className="space-y-4 w-80">
                <div className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail ou nome de usuário</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white border-2 border-black rounded-full text-black" />
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
                          <Input {...field} type="password" className="bg-white border-2 border-black rounded-full text-black" />
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
                    className="bg-login-button rounded-full border-2 border-black uppercase text-white text-lg px-8 py-6 hover:bg-login-buttonHover"
                  >
                    {onSubmit.isLoading ? (
                      <FaSpinner className="animate-spin h-5 w-5" />
                    ) : "Entrar"}
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
