import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo 3 letras' })
    .regex(/^(?!-)([a-z\\-]+)$/i, {
      message: 'Inicie com mínimo 3 letras e pode conter hifens',
    })
    .transform((username) => username.toLowerCase()),
})
/**
 * descrevendo o regex
 * ^começar com.
 * () abrimos o conjunto de regras.
 * [] colocamos dentro do colchetes as condições.
 * a-z significa somente letras de a-z minusculas(caso queira maíscuala use A-Z)
 * ou os dois a-z A-z ou use i no final que tem a mesma função.
 * \ significa condição ou.
 * \- barra invertida seguido de hifem diz que também pode ser com hifem,
 * essa barra com hifem é para regex reconhecer como regra e não como separador como temos em a-z
 * $ ele obriga ter no final também, se prestar a atenção pedimos para começar com nossa regra e se
 * não colocarmos $ ele não vai extender para o fim também.
 * /
 */

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder={'seu usuário'}
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text>
          {errors.username?.message
            ? errors.username?.message
            : isValid
            ? 'É valido ❤️'
            : 'Digite o nome do usuário desejado.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
