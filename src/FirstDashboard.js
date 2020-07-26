import React, { useCallback, useState } from "react"
import { LookerEmbedSDK } from '@looker/embed-sdk'

const {host_url} = require('../config/demo.json')

export const FirstDashboard = ({setFirstDashboardLoaded}) => {
  const [dashboard, setDashboard] = useState()

  const setupDashboard = (dashboard) => {
    setDashboard(dashboard)
  }

  const embedCtrRef = useCallback(el => {
    if (el && host_url) {
      el.innerHTML = ''
      LookerEmbedSDK.init(host_url)
      const db = LookerEmbedSDK.createDashboardWithUrl(document.querySelector('meta[name="iframe"]').content)
      db.appendTo(el)
        .withNext()
        .on('dashboard:loaded', ()=>{setFirstDashboardLoaded(true)})
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error) => {
          console.error('Connection error', error)
        })
    }
  }, [])

  return (
    <>
      <div 
        style={{
          height: '95vh', 
          width: '100vw', 
          'iframe': {
            height: '100%',
            width: '100%'
          }
        }} 
        ref={embedCtrRef}/>
    </>
  )
}