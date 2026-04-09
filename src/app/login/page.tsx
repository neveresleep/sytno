import { AuthForm } from './AuthForm'

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#F8F5F2' }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold" style={{ color: '#993C1D' }}>
          🍽 Сытно
        </h1>
        <p className="mt-2 text-gray-400">Умное меню на неделю</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-[14px] p-6 shadow-sm">
        <AuthForm />
      </div>
    </div>
  )
}
