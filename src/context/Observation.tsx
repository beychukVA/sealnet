import React, { createContext, useContext, useReducer } from 'react'
import { mockData } from '../mock_data/observations'
import { Observation } from '../types/Observation'

export const SelectedObsCntxt = createContext<Observation | null>(null)
export const SelectedObsDispatch = createContext<Observation | null>(null)
export const useSelectedObsCntxt = (): Observation | null =>
  useContext(SelectedObsCntxt)

export const SelectedObsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedObs, dispatch] = useReducer(selectedObsReducer, mockData[0])

  return (
    <SelectedObsCntxt.Provider value={selectedObs}>
      <SelectedObsDispatch.Provider value={selectedObs}>
        {children}
      </SelectedObsDispatch.Provider>
    </SelectedObsCntxt.Provider>
  )
}

const selectedObsReducer = (selectedObservation: Observation) => {
  return selectedObservation
}
