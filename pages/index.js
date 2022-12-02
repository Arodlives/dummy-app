import React,{useEffect,useState} from 'react'
import ChatClient from '../components/ChatClient'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getSession,useSession,signOut } from "next-auth/react"

export default function Home() {
  //   //?  ⬇️Connecting next auth to change this state variable⬇️
  const{data:session}=useSession()


  function handleSignout(){
    signOut()
  }
  
  return(
    <div className={styles.container}>
      <Head>
        <title>Chatterbox</title>
        <meta name="description" content="Social Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session? User({session,handleSignout}) : Guest()}
    </div>
  )
}

function Guest(){
  return (
    <main className='container py-20 mx-auto text-center'>
      <h3 className='text-4xl font-bold'>
        Guest Homepage
      </h3>
      <div className='flex justify-center'>
        <Link href={'/login'} alt="To Login page" className='px-10 py-1 mt-5 bg-indigo-500 rounded-sm text-gray '>Sign in</Link>
      </div>
    </main>
  )
 }
//Authorize User 
  function User({session,handleSignout}){
  return(
    <main className='container py-20 mx-auto text-center'>
    <h3 className='text-4xl font-bold'>
      Authorized Homepage
    </h3>

    <div className='details'>
      <h5><img src={session.user.image} alt="" style={{borderRadius: '50px'}}/></h5>
      <h5>{session.user.name}</h5>
      <h5>{session.user.email}</h5>
      <ChatClient/>
    </div>

    <div className='flex justify-center'>
      <button className='px-10 py-1 mt-5 bg-indigo-500 rounded-sm bg-gray-50' onClick={handleSignout}>
      {/* <LogOutIcon className="w-5 h-5 rotate-180"  /> */}
        Sign Out
      </button>
    </div>

    <div className='flex justify-center'>
      <Link href={'/profile'} alt="To Login page" className='px-10 py-1 mt-5 bg-indigo-500 rounded-sm text-gray '>Profile</Link>
    </div>
  </main>
  )
}

export async function getServerSideProps({req}){
                  //? Returns a cookie🍪
  const session = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent:false,
      }
    }
  }
  

  return {
    props:{
      session
    }
  }
}