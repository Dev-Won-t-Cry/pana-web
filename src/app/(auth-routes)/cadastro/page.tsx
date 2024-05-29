"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SignUpSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaSpinner } from "react-icons/fa";
import { Switch } from "@/components/ui/switch"
import { useMutation } from "react-query";
import Image from "next/image";
import { signUpAction } from "@/app/_actions";

export default function Cadastro() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const result = await signUpAction(values.name, values.email, values.password)

    if (!result) return Promise.reject(result)

    return result
  }

  const onSubmit = useMutation(signUp, {
    onError: () => {
      toast({
        title: "Erro ao fazer cadastro",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      await signIn('credentials', {
        email: form.getValues('email'),
        password: form.getValues('password'),
        redirect: false
      })
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
          <div className="px-16 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => onSubmit.mutate(values))} className="space-y-4 w-80">
                <div className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white border-2 border-black rounded-full text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
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

                <div className="flex flex-col justify-center items-center space-y-3">
                  <Button
                    type="submit"
                    className="bg-login-button rounded-full border-2 border-black uppercase text-white text-lg px-8 py-6 hover:bg-login-buttonHover"
                  >
                    {onSubmit.isLoading ? (
                      <FaSpinner className="animate-spin h-5 w-5" />
                    ) : "Cadastrar"}
                  </Button>
                  <Link href="/">
                    Voltar
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
