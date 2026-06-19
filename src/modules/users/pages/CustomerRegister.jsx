import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HiOutlineChartBar, HiEye, HiEyeOff } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { BsShieldCheck } from "react-icons/bs"
import InputField from "../../../components/InputField"
import Button from "../../../components/Button"
import { registerCustomer } from "../../../services/authService"
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa"

function CustomerRegister() {
  const navigate = useNavigate()
  const redirectTimerRef = useRef(null)

  const role = "customer"
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current)
      }
    }
  }, [])

  const validate = () => {
    const nextErrors = {}

    if (!firstName.trim()) nextErrors.firstName = "First name is required"
    if (!lastName.trim()) nextErrors.lastName = "Last name is required"
    if (!email.trim()) nextErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Enter a valid email address"
    if (!phone.trim()) nextErrors.phone = "Phone is required"
    if (!password.trim()) nextErrors.password = "Password is required"
    if (!confirmPassword.trim()) nextErrors.confirmPassword = "Confirm password is required"
    if (password && confirmPassword && password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match"

    return nextErrors
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    setErrors({})
    setSuccess("")

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    }

 

    setLoading(true)

    try {
      await registerCustomer(payload)

      setSuccess("Registration successful. Redirecting to sign in...")
      redirectTimerRef.current = setTimeout(() => {
        navigate("/", { replace: true })
      }, 1400)
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || error.response?.data?.error || "Registration failed",
      })
    } finally {
      setLoading(false)
    }
  }

 

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#031B52] via-[#043A75] to-[#05AFC7] relative overflow-hidden text-white">
        <div className="absolute top-16 left-16 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>

        <div className="absolute bottom-16 left-16 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col justify-center px-24">
          <h1 className="text-6xl font-bold leading-tight">
            Smart Service
            <br />
            Management
            <br />
            <span className="text-cyan-300">Platform</span>
          </h1>

          <p className="mt-8 text-slate-200 text-lg max-w-md">
            Join the platform as a customer and manage service activity from one place.
          </p>

          <div className="space-y-8 mt-14">
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-3 rounded-xl">
                <HiOutlineChartBar size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Unified Access</h3>
                <p className="text-slate-300">One registration flow for supported roles</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-3 rounded-xl">
                <FiUsers size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Fast Onboarding</h3>
                <p className="text-slate-300">Register with the right role in a single step</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-3 rounded-xl">
                <BsShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Secure Platform</h3>
                <p className="text-slate-300">Consistent authentication and validation flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-lg">
          <h1 className="text-5xl font-bold text-center text-slate-900">Create Account</h1>
          <p className="text-center text-slate-500 mt-3 mb-10">Register to access your panel</p>

          <form onSubmit={handleRegister}>
           

            <InputField
              icon={FaUser}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            {errors.firstName ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.firstName}</p> : null}

            <InputField
              icon={FaUser}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            {errors.lastName ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.lastName}</p> : null}

            <InputField
              icon={FaEnvelope}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.email}</p> : null}

            <InputField
              icon={FaPhone}
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            {errors.phone ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.phone}</p> : null}

           
           
            <InputField
              icon={FaLock}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-5 text-slate-400"
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              }
            />
            {errors.password ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.password}</p> : null}

            <InputField
              icon={FaLock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-5 text-slate-400"
                >
                  {showConfirmPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              }
            />
            {errors.confirmPassword ? (
              <p className="text-red-500 text-sm -mt-3 mb-4">{errors.confirmPassword}</p>
            ) : null}

            {errors.form ? <p className="text-red-500 text-sm mb-5">{errors.form}</p> : null}
            {success ? <p className="text-emerald-600 text-sm mb-5">{success}</p> : null}

            <Button loading={loading} loadingText="Creating Account..." text="Create Account" />
          </form>

          <p className="text-center text-slate-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-600 font-semibold hover:text-cyan-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomerRegister
