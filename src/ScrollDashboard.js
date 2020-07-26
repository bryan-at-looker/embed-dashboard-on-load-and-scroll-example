import React, { useCallback, useState, useMemo, useEffect, createRef, useRef } from "react"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import useVisibility from "./useVisibility"

const {host_url} = require('../config/demo.json')

export const ScrollDashboard = ({dashboard_id}) => {
  const [dashboard, setDashboard] = useState()
  const [open, setOpen] = useState(false)

  const [ is_visible, currentDiv ] = useVisibility();

  const setupDashboard = (dashboard) => {
    setDashboard(dashboard)
  }

  useEffect(()=>{
    if (is_visible) {
      setOpen(true)
    }
  },[currentDiv, is_visible])

  useEffect(()=>{
    if (currentDiv && currentDiv.current && host_url && open) {
      LookerEmbedSDK.init(host_url)
      const db = LookerEmbedSDK.createDashboardWithId(dashboard_id)
      db.appendTo(currentDiv.current)
        .withNext()
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error) => {
          console.error('Connection error', error)
        })
    }
  },[open])

  // useEffect(()=>{
  //   console.log(is_visible)
  //   if (is_visible) {
  //     setOpen(true)
  //   }
  // }, [is_visible])

  // const embedCtrRef = useCallback(el => {
  //   if (el && host_url) {
  //     el.innerHTML = ''
  //     LookerEmbedSDK.init(host_url)
  //     const db = LookerEmbedSDK.createDashboardWithId(dashboard_id)
  //     db.appendTo(el)
  //       .withNext()
  //       .build()
  //       .connect()
  //       .then(setupDashboard)
  //       .catch((error) => {
  //         console.error('Connection error', error)
  //       })
  //   }
  // }, [])

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
        ref={currentDiv}/>
    </>
  )
}