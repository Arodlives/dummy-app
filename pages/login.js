import Head from 'next/head'
import Layout from "../layout/layout";
import { LoginIcon } from "@heroicons/react/outline";
import Link from 'next/link';
import styles from '../styles/Form.module.css'
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../lib/validate';


export default function Login() {
  const [showpass, setShowpass] = useState(false);
  //? ⤵️ inside the object is the options with the import
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    //onsubmit:func name
    onSubmit
  })

  console.log(formik.errors)

  async function onSubmit(values) {
    console.log(values)
  }

  //? Google Handler 
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: 'http://localhost:3000' })
  }
  //? Github Handler 
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" })
  }



  return (
    <Layout>

      <Head>
        <title>Login</title>
      </Head>

      <section className='flex flex-col w-3/4 gap-10 mx-auto '>
        <div className='title'>
          <h1 className='py-4 text-4xl font-bold text-gray-800'>Log in</h1>
          <p className='w-3/4 mx-auto text-gray-400'>Welcome to <span className='underline decoration-sky-500 hover:decoration-blue-400 '>Chatterbox</span>,please put your login credentials below to use the app</p>
        </div>
        {/* form */}
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          {/* //*➡️Email */}
          <div className={styles.input_group}>
            {/* <div className={`${styles.input_group}${formik.errors.email && formik.touched.email?'border-rose-600':''}`}> */}
            {/* useable with formik onChange={formik.handleChange} value={formik.values.email} ⤵️*/}
            <input type='email' className={styles.input_text} name='email' placeholder='Email' {...formik.getFieldProps('email')} />
            {/* //* Icon for input⬇️*/}
            <span className='flex items-center px-4 icon'>
              <HiAtSymbol size={25} />
            </span>
            {/* //* Icon for input⤴️ */}
          </div>
          {/* //?☠️Error Validation Message */}
          {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
          <div className={styles.input_group}>
            {/* <div className={`${styles.input_group}${formik.errors.password && formik.touched.password?'border-rose-600':''}`}> */}
            {/* onChange={formik.handleChange} value={formik.values.password} */}
            <input type={`${showpass ? "text" : "password"}`} className={styles.input_text} name='password' placeholder='Password' {...formik.getFieldProps('password')} />
            {/* //* Icon for input⬇️*/}
            <span className='flex items-center px-4 icon' onClick={() => setShowpass(!showpass)}>
              <HiFingerPrint size={25} />
            </span>
            {/* //* Icon for input⤴️ */}
          </div>
          {/* //?☠️Error Validation Message */}
          {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

          {/* Login-Buttons */}
          <div className='flex flex-col items-center input-button'>
            <button type='submit' className={styles.button}>
              <LoginIcon className="w-5 h-5 rotate-180" />
              Login
            </button>
          </div>

          {/* ⤵️Sign In with Google */}
          <div className='flex flex-col items-center input-button'>
            <button type='button' className={styles.button_custom} onClick={handleGoogleSignin}>
              {/* <LoginIcon className="w-5 h-5 rotate-180"  /> */}
              Sign In with Google
              <Image src={'/assets/google.svg'} alt="google image" width="20" height={20}></Image>
            </button>
          </div>

          {/* ⤵️Sign In with Github */}
          <div className='flex flex-col items-center input-button'>
            <button type='button' className={styles.button_custom} onClick={handleGithubSignin}>
              {/* <LoginIcon className="w-5 h-5 rotate-180"  /> */}
              Sign In with Github
              <Image src={'/assets/github.svg'} alt="google image" width="20" height={20}></Image>
            </button>
          </div>

        </form>
        {/* bottom */}
        <p className='text-center text-gray-400'>
          {/* //➡️ &apos;= apostrophe , &lsquo; ,&rsquo; ⬅️ \\ */}
          Don&apos;t have an account yet?
          <Link href={'/register'} className='hover:text-blue-400'>
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  )
}

