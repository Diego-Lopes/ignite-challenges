import { Outlet } from "react-router-dom";
/**
 * Outlet ele é usado para receber o children lá no arquivo routes. 
 * do react-router-dom
 */
export function AppLayout() {
  return(
    <>
      <h1>Cabeçalho</h1>
      <div>
        <Outlet /> 
      </div>
    </>
  )
}