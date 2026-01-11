import { useParams } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
  const { type } = useParams()

  return (
    <AuthLayout>
      {type === 'register' ? <RegisterForm /> : <LoginForm />}
    </AuthLayout>
  )
}

export default AuthPage
