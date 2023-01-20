import { useContext, useEffect } from "react";
import { CyclesContext } from "../../context/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)
  useEffect(() => {
    
      document.title = "Ignite Timer"
    
  }, [])

  return (
    <HistoryContainer>

      <h1>My History</h1>
      {/* <pre>
        {
          JSON.stringify(cycles, null, 2)
        }
      </pre> */}
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cycles.map(cycle => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>
                      {
                        cycle.minutesAmount <= 1 ?
                          `${cycle.minutesAmount} minuto` :
                          `${cycle.minutesAmount} minutos`
                      }
                    </td>
                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR
                    })}</td>
                    <td>
                      {
                        cycle.finishedDate &&
                        (<Status statusColor="green">Concluído</Status>)
                      }
                      {
                        cycle.interruptedDate &&
                        (<Status statusColor="red">Interrompido</Status>)
                      }
                      {
                        !cycle.finishedDate && !cycle.interruptedDate &&
                        (<Status statusColor="yellow">Andamento</Status>)
                      }
                    </td>
                  </tr>
                )
              }).reverse()
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
