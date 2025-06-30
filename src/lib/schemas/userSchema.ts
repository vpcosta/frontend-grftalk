import { z } from 'zod'

export const updateUserSchema = z.object({
    name: z.string().min(1, { message: 'O campo nome é obrigatório!' }).max(80, { message: 'Tamanho máximo do campo excedido!'}),
    email: z.string().email({ message: 'E-mail inválido!'}).max(254, { message: 'Tamanho máximo do campo excedido!' }),
    password: z.string().max(80, { message: 'Senha muito grande!' }).refine(value => !value || /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$/.test(value), {
        message: 'A senha deve conter pelo menos um número, uma letra minúscula, uma letra maiúscula e um símbolo!'
    }),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
        message: 'As senhas não conferem!',
        path: ['confirm_password']
})

export type UpdateUserData = z.infer<typeof updateUserSchema>