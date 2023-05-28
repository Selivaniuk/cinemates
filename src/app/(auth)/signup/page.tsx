'use client'

import classNames from 'classnames'
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
  name?: string
  confirm?: string
}

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

const validateFields = (email: string, password: string, name: string, confirm: string): Errors => {
  const newErrors: Errors = {}
  if (!name) newErrors.name = 'Please enter your name.'
  if (!email) {
    newErrors.email = 'Please enter your email.'
  } else if (!validateEmail(email)) {
    newErrors.email = 'Invalid email format.'
  }
  if (!password) {
    newErrors.password = 'Please enter your password.'
  }
  if (!confirm) {
    newErrors.confirm = 'Please confirm your password.'
  } else if (password !== confirm) {
    newErrors.confirm = 'Password mismatch.'
  }
  return newErrors
}

const SignUp = () => {
  const router = useRouter()
  const nameRef = useRef<string>('')
  const emailRef = useRef<string>('')
  const passwordRef = useRef<string>('')
  const confirmRef = useRef<string>('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [credentialsError, setCredentialsError] = useState('')
  const submit = async (name: string, email: string, password: string) => {
    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        signIn('credentials', { email, password, redirect: false }).then((r) => {
          if (!r?.error) {
            setLoading(false)
            router.push('/')
          }
        })
      } else {
        if (res.status === 400) {
          setErrors((error) => ({ ...error, email: 'This email is already in use' }))
        } else {
          setCredentialsError(res.statusText)
        }

        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      setCredentialsError(error)
    }
  }

  const handleInputChange = (field: keyof Errors, value: string) => {
    if (credentialsError) setCredentialsError('')
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
    if (field === 'email') {
      emailRef.current = value
    } else if (field === 'password') {
      passwordRef.current = value
    } else if (field === 'name') {
      nameRef.current = value
    } else if (field === 'confirm') {
      confirmRef.current = value
    }
  }

  const handleSubmit = () => {
    const email = emailRef.current
    const password = passwordRef.current
    const name = nameRef.current
    const confirm = confirmRef.current
    const newErrors = validateFields(email, password, name, confirm)

    if (Object.keys(newErrors).length === 0) {
      submit(name, email, password)
    }

    setErrors(newErrors)
  }
  const getInputError = (field: keyof Errors): { type: 'error' | 'success'; message: string } | undefined => {
    if (credentialsError) return { type: 'error', message: '' }
    if (errors[field]) return { type: 'error', message: errors[field] ?? '' }
    if (field === 'confirm' && passwordRef.current && confirmRef.current) {
      if (passwordRef.current !== confirmRef.current) return { type: 'error', message: '' }
      return { type: 'success', message: '' }
    }
    return undefined
  }

  return (
    <div>
      <div>
        <h4>Sign up</h4>
        <p className={classNames({ [styles.visibleError]: !!credentialsError }, styles.error)}>{credentialsError}</p>
        <div className={styles.form}>
          <Input
            type='transparent'
            label='Name'
            placeholder='Your name'
            htmlType='text'
            onChange={(e) => handleInputChange('name', e.target.value)}
            status={getInputError('name')}
            suffix={<Icon className={styles.icon} name='person' />}
          />
          <Input
            type='transparent'
            label='E-mail'
            placeholder='example@gmail.com'
            htmlType='email'
            onChange={(e) => handleInputChange('email', e.target.value)}
            status={getInputError('email')}
            suffix={<Icon className={styles.icon} name='mail' />}
          />
          <Input
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
          <Input
            type='transparent'
            label='Confirm password'
            placeholder='************'
            htmlType={confirmPasswordVisible ? 'text' : 'password'}
            onChange={(e) => handleInputChange('confirm', e.target.value)}
            status={getInputError('confirm')}
            suffix={
              <Icon
                className={classNames([styles.icon, styles.visibleIcon])}
                onClick={() => {
                  setConfirmPasswordVisible((v) => !v)
                }}
                name={`visibility${confirmPasswordVisible ? '' : '_off'}`}
              />
            }
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleSubmit} variant='gradient' loading={loading}>
          Sign up
        </Button>

        <Button
          onClick={() => router.push('/signin')}
          className={styles.secButton}
          variant='dark'
          appearance='soft-transparent'
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}

export default SignUp
