import React, { createContext, useContext, useState } from 'react'

interface UIContextType {
  isUpdate: number
  updateUI: () => void
}

export const UpdateUiContext = createContext<UIContextType>({
  isUpdate: Math.random(),
  updateUI: () => {},
})

interface UpdateUiProviderProps {
  children: React.ReactNode
}

export const UpdateUiProvider: React.FC<UpdateUiProviderProps> = ({
  children,
}) => {
  const [isUpdate, setUpdate] = useState(Math.random())

  const updateUI = () => setUpdate(Math.random())

  const contextValue: UIContextType = {
    isUpdate,
    updateUI,
  }

  return (
    <UpdateUiContext.Provider value={contextValue}>
      {children}
    </UpdateUiContext.Provider>
  )
}

export const useUpdateUI = () => useContext(UpdateUiContext)
