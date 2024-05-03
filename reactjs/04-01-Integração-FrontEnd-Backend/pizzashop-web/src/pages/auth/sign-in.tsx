import { Helmet } from "react-helmet-async"

export function SignIn() {
  return (
    <>
      <Helmet title="SignIn" />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold">Acessar painel</h1>
            <p>Acompanhe suas vendas pelo painel do parceiro!</p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}