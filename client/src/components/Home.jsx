import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import GrandParent from './GrandParent'

const Home = () => {
  return (
    <>
    <Header />
    <GrandParent />
    <Outlet />
    </>
  )
}

export default Home