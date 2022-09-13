import React, {
  useState,
  useRef,
  createContext,
  useContext,
  RefObject,
  Dispatch,
  SetStateAction
} from 'react'

const DigitalHumanContext = createContext<{
  shown: boolean
  setShown: Dispatch<SetStateAction<boolean>>
  sendMessage: RefObject<() => void>
}>({
  shown: false,
  setShown: () => {},
  sendMessage: { current: () => {} }
})

type DigitalHumanProps = Omit<
  React.ComponentProps<typeof DigitalHumanContext.Provider>,
  'value'
>

export const DigitalHumanProvider = ({ children }: DigitalHumanProps) => {
  const [shown, setShown] = useState(false)
  const sendMessage = useRef(() => {})

  return (
    <DigitalHumanContext.Provider value={{ shown, setShown, sendMessage }}>
      {children}
    </DigitalHumanContext.Provider>
  )
}

export const useDigitalHuman = () => {
  const state = useContext(DigitalHumanContext)

  return state
}
