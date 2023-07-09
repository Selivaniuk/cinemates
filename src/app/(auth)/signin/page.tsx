'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'

import styles from '../AuthLayout.module.scss'

import Button from 'ui/Button'
import Icon from 'ui/Icon'
import Input from 'ui/Input'

interface Errors {
  email?: string
  password?: string
}

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

const validateFields = (email: string, password: string): Errors => {
  const newErrors: Errors = {}
  if (!email) {
    newErrors.email = 'Please enter your email.'
  } else if (!validateEmail(email)) {
    newErrors.email = 'Invalid email format.'
  }
  if (!password) {
    newErrors.password = 'Please enter your password.'
  }
  return newErrors
}

const SignIn = () => {
  const router = useRouter()
  const emailRef = useRef<string>('')
  const passwordRef = useRef<string>('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [credentialsError, setCredentialsError] = useState('')

  const onGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' })
  }
  const onGithubLogin = async () => {
    await signIn('github', { callbackUrl: '/' })
  }

  const submit = async (email: string, password: string) => {
    setLoading(true)
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        setLoading(false)
        if (res?.error) setCredentialsError(res.error)
        else {
          router.push('/')
        }
      })
      .catch((error) => {
        setCredentialsError(error)
      })
  }

  const handleInputChange = (field: keyof Errors, value: string) => {
    if (credentialsError) setCredentialsError('')
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
    if (field === 'email') {
      emailRef.current = value
    } else if (field === 'password') {
      passwordRef.current = value
    }
  }

  const handleSubmit = () => {
    const email = emailRef.current
    const password = passwordRef.current
    const newErrors = validateFields(email, password)

    if (Object.keys(newErrors).length === 0) {
      submit(email, password)
    }

    setErrors(newErrors)
  }
  const getInputError = (field: keyof Errors): { type: 'error'; message: string } | undefined => {
    if (credentialsError) return { type: 'error', message: '' }
    if (errors[field]) return { type: 'error', message: errors[field] ?? '' }
    return undefined
  }

  return (
    <div>
      <div>
        <h4 className={styles.title}>Sign in</h4>
        <p className={classNames({ [styles.visibleError]: !!credentialsError }, styles.error)}>{credentialsError}</p>
        <div className={styles.form}>
          <Input
            className={styles.input}
            type='transparent'
            label='E-mail'
            placeholder='example@gmail.com'
            htmlType='email'
            onChange={(e) => handleInputChange('email', e.target.value)}
            status={getInputError('email')}
            suffix={<Icon className={styles.icon} name='mail' />}
          />
          <Input
            className={styles.input}
            type='transparent'
            label='Password'
            placeholder='************'
            htmlType={passwordVisible ? 'text' : 'password'}
            onChange={(e) => handleInputChange('password', e.target.value)}
            status={getInputError('password')}
            suffix={
              <Icon
                className={classNames([styles.icon, styles.visibleIcon])}
                onClick={() => {
                  setPasswordVisible((v) => !v)
                }}
                name={`visibility${passwordVisible ? '' : '_off'}`}
              />
            }
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleSubmit} variant='gradient' loading={loading}>
          Sign in
        </Button>
        <Button
          onClick={() => router.push('/signup')}
          className={styles.secButton}
          variant='dark'
          appearance='soft-transparent'
        >
          Sign up
        </Button>
        <p className={styles.or}>Or</p>
        <Button
          onClick={onGoogleLogin}
          icon={
            <Image
              alt='Google sign-in'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png'
              width={20}
              height={20}
            />
          }
          variant='light'
        >
          Login with Google
        </Button>
        <Button
          onClick={onGithubLogin}
          icon={
            <Image
              alt='GitHub sign-in'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png'
              width={20}
              height={20}
            />
          }
          variant='light'
        >
          Login with GitHub
        </Button>
      </div>
    </div>
  )
}

export default SignIn
