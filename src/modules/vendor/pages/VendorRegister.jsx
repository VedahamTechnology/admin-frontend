import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaPhone, FaUser, FaBuilding } from "react-icons/fa"
import { HiOutlineChartBar, HiEye, HiEyeOff } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { BsShieldCheck } from "react-icons/bs"
import InputField from "../../../components/InputField"
import Button from "../../../components/Button"
import { registerVendor } from "../../../services/authService"


function VendorRegister() {
  const navigate = useNavigate()
  const redirectTimerRef = useRef(null)

  const role = "vendor"
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  const [serviceAreas, setServiceAreas] = useState("")

  const [aadharNumber, setAadharNumber] = useState("")
  const [panNumber, setPanNumber] = useState("")

  const [aadharFront, setAadharFront] = useState("")
  const [aadharBack, setAadharBack] = useState("")
  const [panCard, setPanCard] = useState("")
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
    if (role === "vendor") {
  if (!businessName.trim())
    nextErrors.businessName = "Business name is required"

  if (!ownerName.trim())
    nextErrors.ownerName = "Owner name is required"

  if (!aadharNumber.trim())
    nextErrors.aadharNumber = "Aadhaar number is required"

  if (!panNumber.trim())
    nextErrors.panNumber = "PAN number is required"

  if (!aadharFront.trim())
    nextErrors.aadharFront = "Aadhaar front URL is required"

  if (!aadharBack.trim())
    nextErrors.aadharBack = "Aadhaar back URL is required"

  if (!panCard.trim())
    nextErrors.panCard = "PAN card URL is required"
} 

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

   if (role === "vendor") {
  payload.businessName = businessName.trim()
  payload.ownerName = ownerName.trim()

  payload.experience = Number(experience || 0)

  payload.skills = skills
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  payload.serviceAreas = serviceAreas
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  payload.aadharNumber = aadharNumber.trim()
  payload.panNumber = panNumber.trim()

  payload.aadharFront = aadharFront.trim()
  payload.aadharBack = aadharBack.trim()
  payload.panCard = panCard.trim()
}

    setLoading(true)

    try {
        await registerVendor(payload)

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
            Join the platform as a vendor and manage service activity from one place.
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
          <h1 className="text-5xl font-bold text-center text-slate-900">Vendor Registration</h1>
          <p className="text-center text-slate-500 mt-3 mb-10">Register your business and get approved</p>

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

            {role === "vendor" ? (
              <>
                <InputField
                  icon={FaBuilding}
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                />
                {errors.businessName ? (
                  <p className="text-red-500 text-sm -mt-3 mb-4">{errors.businessName}</p>
                ) : null}
              </>
            ) : null}
            
            <InputField
              icon={FaUser}
              type="text"
              placeholder="Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />

            <InputField
              icon={FaBuilding}
              type="number"
              placeholder="Experience (Years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <InputField
              icon={FaBuilding}
              type="text"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <InputField
              icon={FaBuilding}
              type="text"
              placeholder="Service Areas (comma separated)"
              value={serviceAreas}
              onChange={(e) => setServiceAreas(e.target.value)}
            />

            <InputField
              icon={FaUser}
              type="text"
              placeholder="Aadhaar Number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
            />

            <InputField
              icon={FaUser}
              type="text"
              placeholder="PAN Number"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />

            <InputField
              icon={FaUser}
              type="text"
              placeholder="Aadhaar Front URL"
              value={aadharFront}
              onChange={(e) => setAadharFront(e.target.value)}
            />

            <InputField
              icon={FaUser}
              type="text"
              placeholder="Aadhaar Back URL"
              value={aadharBack}
              onChange={(e) => setAadharBack(e.target.value)}
            />

            <InputField
              icon={FaUser}
              type="text"
              placeholder="PAN Card URL"
              value={panCard}
              onChange={(e) => setPanCard(e.target.value)}
            />

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

export default VendorRegister
