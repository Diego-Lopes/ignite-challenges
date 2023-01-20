import { Cycle } from "./reducer";
// typando dispatch
export enum ActionTypes {
  add_new_cycle = "add_new_cycle",
  interrupt_current_cycle = "interrupt_current_cycle",
  mark_current_finished_cycle = "mark_current_finished_cycle",

}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.add_new_cycle,
    payload: {
      newCycle,
    }
  }
}
export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.mark_current_finished_cycle
  }
}
export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.interrupt_current_cycle
  }
}