import React, { useContext } from 'react'
import { Alert as AlertPropType } from '../models/AlertModel'
import Alert from '../components/common/Alert'
import Navbar from '../components/includes/Navbar'
import AlertContextProvider, { AlertContext } from '../context/AlertContext'
import '../styles/globals.css'
import Banner from '../components/common/Banner'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Pixelify - Free Image Pixelation Tools Online.</title>
        <meta name="description" content="Pixelize your image for free online." />
        <link rel="icon" href="/assets/svg/logo.svg" />

        <meta property="og:title" content="Pixelify - Free Image Pixelation Tools Online." />
        <meta property="og:description" content="Offering tour packages for individuals or groups." />
        <meta property="og:image" content="https://pixelify.vercel.app/assets/img/meta.png"/>
        <meta property="og:url" content="https://pixelify.vercel.app/"></meta>

        <meta name="twitter:title" content="Pixelify - Free Image Pixelation Tools Online." />
        <meta name="twitter:description" content="Offering tour packages for individuals or groups." />
        <meta name="twitter:image" content="https://pixelify.vercel.app/assets/img/meta.png" />
        <meta name="twitter:card" content="https://pixelify.vercel.app/assets/img/meta.png"></meta>
      </Head>
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
      <Banner />
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
