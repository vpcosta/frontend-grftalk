'use client'
import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido!' }),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 digitos!' })
})

export type SignInData = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Nome obrigatório!'}).max(80, 'Nome muito grande!'),
    email: z.string().email({ message: 'E-mail inválido!' }).max(80, 'E-mail muito grande!'),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 digitos!' }).regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$/, {
        message: 'A senha deve conter pelo menos um número, uma letra minúscula, uma letra maiúscula e um símbolo!'
    }).max(80,{ message: 'Senha muito grande'})
})

export type SignUpData = z.infer<typeof signUpSchema>
