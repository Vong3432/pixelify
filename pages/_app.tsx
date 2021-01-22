import React, { useContext } from 'react'
import { Alert as AlertPropType } from '../models/AlertModel'
import Alert from '../components/common/Alert'
import Navbar from '../components/includes/Navbar'
import AlertContextProvider, { AlertContext } from '../context/AlertContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <AlertContextProvider>
        <Content Component={Component} pageProps={pageProps} />
      </AlertContextProvider>
    </>
  )
}

function Content({ Component, pageProps }) {

  // Alert refer from https://alexanderpaterson.com/posts/showing-and-dismissing-alerts-in-a-react-application
  const { state } = useContext(AlertContext)

  return (
    <div className="font-mono">
      <Navbar />
      <Component {...pageProps} />

      <div className="flex justify-center">
        {state.map((alert: AlertPropType) =>
          <Alert
            key={alert.id}
            id={alert.id}
            type={alert.type}
            text={alert.text}
            tailwindClasses={alert.tailwindClasses}
          />
        )}
      </div>
    </div>
  )
}

export default MyApp
