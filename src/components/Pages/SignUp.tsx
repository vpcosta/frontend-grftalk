'use client'

import { SignUpData, signUpSchema } from '@/lib/schemas/authSchema'
import { handleSignUp } from '@/lib/server/auth'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Input } from '../ui/input'

export const SignUpPage = () => {
    const [loading, setLoading] = useState(false)

    const setuser = useAuthStore(state => state.setUser)
    const router = useRouter()

    const form = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: SignUpData) => {
        setLoading(true)
        const response = await handleSignUp(values)

        if (response.error) {
            setLoading(false)
            toast.error(response.error.message, { position: 'top-center' })

            return;
        }

        setuser(response.data.user)
        toast.success('Autenticado com sucesso!', { position: 'top-center' })

        router.push('/')
    }

    return (
        <main className='h-app flex items-center justify-center overflow-auto px-6'>
            <Card className='w-96'>
                <CardHeader>
                    <CardTitle>
                        Crie uma conta
                    </CardTitle>

                    <CardDescription>
                        Insira seu nome, e-mail e sennha para criar uma conta
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <Form { ...form }>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <div className='space-y-3'>
                                {loading ?
                                    <>
                                        { ...Array({ length: 3 }).map((_, key) => (
                                            <Skeleton
                                                key={key}
                                                className='h-10 rounded-md'
                                            />
                                        ))}
                                    </>
                                    :
                                    <>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>

                                                    <FormControl>
                                                        <Input placeholder='Ex: João Silva' {...field}/>
                                                    </FormControl>

                                                    <FormMessage  />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>E-mail</FormLabel>

                                                    <FormControl>
                                                        <Input placeholder='Ex: joao10@email.com' {...field}/>
                                                    </FormControl>

                                                    <FormMessage  />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Senha</FormLabel>

                                                    <FormControl>
                                                        <Input type='password' placeholder='Ex: 123@Algo' {...field}/>
                                                    </FormControl>

                                                    <FormMessage  />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                }
                            </div>

                            <Button className='w-full' disabled={loading}>Registrar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}