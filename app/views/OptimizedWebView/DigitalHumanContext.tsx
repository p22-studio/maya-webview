import React, {
  useState,
  useRef,
  createContext,
  useContext,
  RefObject,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react'
import { ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'

type MessageTypes = 'loadingVideoStarted' | 'mayaMessage'
type SendMessage = (type: MessageTypes) => (payload: string) => void

const DigitalHumanContext = createContext<{
  ref: RefObject<WebView>
  shown: boolean
  setShown: Dispatch<SetStateAction<boolean>>
  style: ViewStyle
  setStyle: Dispatch<SetStateAction<ViewStyle>>
  width: number | null
  setWidth: Dispatch<SetStateAction<number | null>>
  height: number | null
  setHeight: Dispatch<SetStateAction<number | null>>
  sendMessage: SendMessage
}>({
  ref: { current: null },
  shown: false,
  setShown: () => {},
  style: {},
  setStyle: () => {},
  width: null,
  setWidth: () => {},
  height: null,
  setHeight: () => {},
  sendMessage: () => () => {}
})

type DigitalHumanProps = Omit<
  React.ComponentProps<typeof DigitalHumanContext.Provider>,
  'value'
>

export const DigitalHumanProvider = ({ children }: DigitalHumanProps) => {
  const [shown, setShown] = useState(false)
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [style, setStyle] = useState<ViewStyle>({})
  const ref = useRef<WebView>(null)

  const sendMessage = useCallback(
    (type: MessageTypes) => (payload: string) => {
      const parsedPayload = `{ type: 'question', question: '${payload || ''}' }`
      const script = `
    window.ReactNativeWebView.mayaWebView.sendMessage({
      type: '${type}', payload: ${parsedPayload}
    })
    true
  `

      ref.current?.injectJavaScript(script)
    },
    []
  )

  return (
    <DigitalHumanContext.Provider
      value={{
        ref,
        shown,
        setShown,
        sendMessage,
        style,
        setStyle,
        width,
        setWidth,
        height,
        setHeight
      }}
    >
      {children}
    </DigitalHumanContext.Provider>
  )
}

export const useDigitalHuman = () => {
  const state = useContext(DigitalHumanContext)

  return state
}
