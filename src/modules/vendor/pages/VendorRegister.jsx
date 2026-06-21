import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaPhone, FaUser, FaBuilding } from "react-icons/fa"
import { HiOutlineChartBar, HiEye, HiEyeOff, HiCheck, HiOutlineCloudUpload, HiOutlineDocumentText } from "react-icons/hi"
import { FiUsers, FiTrendingUp } from "react-icons/fi"
import { BsShieldCheck } from "react-icons/bs"
import InputField from "../../../components/InputField"
import Button from "../../../components/Button"
import { registerVendor } from "../../../services/authService"
 
const STEPS = [
  { id: 1, label: "Personal", title: "Personal Information", description: "Tell us about yourself" },
  { id: 2, label: "Business", title: "Business Information", description: "Tell us about your business" },
  { id: 3, label: "Verification", title: "Verification Documents", description: "Upload details required for approval" },
]
 
function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {children}
      {required ? <span className="text-red-500 ml-0.5">*</span> : null}
    </label>
  )
}
 
function FileUploadField({ label, required, value, fileName, onChange, error }) {
  const inputRef = useRef(null)
 
  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onChange({ dataUrl: reader.result, name: file.name })
    }
    reader.readAsDataURL(file)
  }
 
  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }
 
  return (
    <div className="mb-4">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className={[
          "border-2 border-dashed rounded-xl px-4 py-5 cursor-pointer transition-colors",
          "flex items-center gap-3",
          value
            ? "border-cyan-300 bg-cyan-50/50"
            : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400",
        ].join(" ")}
      >
        <div
          className={[
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            value ? "bg-cyan-100 text-[#05AFC7]" : "bg-white text-slate-400 border border-slate-200",
          ].join(" ")}
        >
          {value ? <HiOutlineDocumentText size={20} /> : <HiOutlineCloudUpload size={20} />}
        </div>
 
        <div className="min-w-0">
          {value ? (
            <>
              <p className="text-sm font-medium text-slate-800 truncate">{fileName}</p>
              <p className="text-xs text-[#05AFC7]">Click to replace file</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-600">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-400">PNG, JPG or PDF</p>
            </>
          )}
        </div>
 
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
      {error ? <p className="text-red-500 text-sm mt-1.5">{error}</p> : null}
    </div>
  )
}
 
function VendorRegister() {
  const navigate = useNavigate()
  const redirectTimerRef = useRef(null)
 
  const role = "vendor"
  const [currentStep, setCurrentStep] = useState(1)
 
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
 
  // Display-only filenames for the upload boxes; do not affect payload.
  const [aadharFrontFileName, setAadharFrontFileName] = useState("")
  const [aadharBackFileName, setAadharBackFileName] = useState("")
  const [panCardFileName, setPanCardFileName] = useState("")
 
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
 
  // Step-scoped validation subsets, derived from the same rules as validate().
  // These only gate forward navigation; final submission still relies on validate().
  const getStep1Errors = () => {
    const all = validate()
    const keys = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"]
    const stepErrors = {}
    keys.forEach((key) => {
      if (all[key]) stepErrors[key] = all[key]
    })
    return stepErrors
  }
 
  const getStep2Errors = () => {
    const all = validate()
    const keys = ["businessName", "ownerName"]
    const stepErrors = {}
    keys.forEach((key) => {
      if (all[key]) stepErrors[key] = all[key]
    })
    return stepErrors
  }
 
  const getStep3Errors = () => {
    const all = validate()
    const keys = ["aadharNumber", "panNumber", "aadharFront", "aadharBack", "panCard"]
    const stepErrors = {}
    keys.forEach((key) => {
      if (all[key]) stepErrors[key] = all[key]
    })
    return stepErrors
  }
 
  const handleNext = () => {
    setErrors({})
    setSuccess("")
 
    if (currentStep === 1) {
      const stepErrors = getStep1Errors()
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      const stepErrors = getStep2Errors()
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        return
      }
      setCurrentStep(3)
    }
  }
 
  const handleBack = () => {
    setErrors({})
    setSuccess("")
    setCurrentStep((step) => Math.max(1, step - 1))
  }
 
  const handleRegister = async (event) => {
    event.preventDefault()
 
    setErrors({})
    setSuccess("")
 
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
 
      const step3Errors = getStep3Errors()
      const step2Errors = getStep2Errors()
      const step1Errors = getStep1Errors()
      if (Object.keys(step1Errors).length > 0) setCurrentStep(1)
      else if (Object.keys(step2Errors).length > 0) setCurrentStep(2)
      else if (Object.keys(step3Errors).length > 0) setCurrentStep(3)
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
 
  const activeStepInfo = STEPS.find((step) => step.id === currentStep)
 
  return (
    <div className="min-h-screen flex">
      {/* Branding panel — 35-40% width */}
      <div className="hidden lg:flex lg:w-[38%] bg-gradient-to-br from-[#031B52] via-[#043A75] to-[#05AFC7] relative overflow-hidden text-white">
        <div className="absolute top-16 left-10 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
 
        <div className="absolute bottom-16 left-10 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
 
        <div className="absolute inset-0 bg-black/10" />
 
        <div className="relative z-10 flex flex-col justify-center px-12">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Grow your
            <br />
            service business
            <br />
            <span className="text-cyan-300">with Homster</span>
          </h1>
 
          <p className="mt-6 text-slate-200 text-base max-w-sm">
            Join thousands of vendors managing bookings, workers, and earnings from one dashboard.
          </p>
 
          <div className="space-y-7 mt-12">
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl flex-shrink-0">
                <HiOutlineChartBar size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Receive Bookings</h3>
                <p className="text-slate-300 text-sm">Get customer bookings delivered straight to your dashboard</p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl flex-shrink-0">
                <FiUsers size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Manage Workers & Services</h3>
                <p className="text-slate-300 text-sm">Assign jobs and keep your team organized in one place</p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl flex-shrink-0">
                <BsShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Get Verified</h3>
                <p className="text-slate-300 text-sm">Complete a simple verification process to start earning</p>
              </div>
            </div>
 
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl flex-shrink-0">
                <FiTrendingUp size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Start Earning</h3>
                <p className="text-slate-300 text-sm">Grow your customer base and track your revenue with ease</p>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Registration form panel — 60-65% width */}
      <div className="flex-1 lg:w-[62%] bg-slate-100 flex items-center justify-center p-6 lg:p-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 lg:p-12 w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-900">Vendor Registration</h1>
          <p className="text-center text-slate-500 mt-3 mb-10">Register your business and get approved</p>
 
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center">
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.id
                const isActive = currentStep === step.id
 
                return (
                  <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={[
                          "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-300",
                          isCompleted
                            ? "bg-[#05AFC7] border-[#05AFC7] text-white"
                            : isActive
                            ? "border-[#05AFC7] text-[#05AFC7] bg-cyan-50"
                            : "border-slate-300 text-slate-400 bg-white",
                        ].join(" ")}
                      >
                        {isCompleted ? <HiCheck size={18} /> : step.id}
                      </div>
                      <span
                        className={[
                          "mt-2 text-[11px] sm:text-xs font-medium whitespace-nowrap",
                          isActive || isCompleted ? "text-[#043A75]" : "text-slate-400",
                        ].join(" ")}
                      >
                        {step.label}
                      </span>
                    </div>
 
                    {index < STEPS.length - 1 ? (
                      <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full overflow-hidden bg-slate-200">
                        <div
                          className="h-full bg-[#05AFC7] transition-all duration-500 ease-out"
                          style={{ width: currentStep > step.id ? "100%" : "0%" }}
                        />
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
 
          {/* Step title */}
          <div className="mb-8 transition-opacity duration-300">
            <h2 className="text-xl font-semibold text-slate-900">
              Step {currentStep}: {activeStepInfo.title}
            </h2>
            <p className="text-slate-500 text-sm mt-1">{activeStepInfo.description}</p>
          </div>
 
          <form onSubmit={handleRegister}>
            <div key={currentStep} className="animate-[fadeIn_0.25s_ease]">
              {currentStep === 1 ? (
                <div className="grid sm:grid-cols-2 gap-x-4">
                  <div>
                    <FieldLabel required>First Name</FieldLabel>
                    <InputField
                      icon={FaUser}
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    {errors.firstName ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.firstName}</p> : null}
                  </div>
 
                  <div>
                    <FieldLabel required>Last Name</FieldLabel>
                    <InputField
                      icon={FaUser}
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    {errors.lastName ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.lastName}</p> : null}
                  </div>
 
                  <div className="sm:col-span-2">
                    <FieldLabel required>Email</FieldLabel>
                    <InputField
                      icon={FaEnvelope}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.email}</p> : null}
                  </div>
 
                  <div className="sm:col-span-2">
                    <FieldLabel required>Phone</FieldLabel>
                    <InputField
                      icon={FaPhone}
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                    {errors.phone ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.phone}</p> : null}
                  </div>
 
                  <div>
                    <FieldLabel required>Password</FieldLabel>
                    <InputField
                      icon={FaLock}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
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
                  </div>
 
                  <div>
                    <FieldLabel required>Confirm Password</FieldLabel>
                    <InputField
                      icon={FaLock}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
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
                  </div>
                </div>
              ) : null}
 
              {currentStep === 2 ? (
                <div className="grid sm:grid-cols-2 gap-x-4">
                  <div>
                    <FieldLabel required>Business Name</FieldLabel>
                    <InputField
                      icon={FaBuilding}
                      type="text"
                      placeholder="Acme Home Services"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                    />
                    {errors.businessName ? (
                      <p className="text-red-500 text-sm -mt-3 mb-4">{errors.businessName}</p>
                    ) : null}
                  </div>
 
                  <div>
                    <FieldLabel required>Owner Name</FieldLabel>
                    <InputField
                      icon={FaUser}
                      type="text"
                      placeholder="John Doe"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                    {errors.ownerName ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.ownerName}</p> : null}
                  </div>
 
                  <div>
                    <FieldLabel>Experience (Years)</FieldLabel>
                    <InputField
                      icon={FaBuilding}
                      type="number"
                      placeholder="5"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
 
                  <div>
                    <FieldLabel>Skills</FieldLabel>
                    <InputField
                      icon={FaBuilding}
                      type="text"
                      placeholder="Plumbing, Electrical"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
 
                  <div className="sm:col-span-2">
                    <FieldLabel>Service Areas</FieldLabel>
                    <InputField
                      icon={FaBuilding}
                      type="text"
                      placeholder="Bareilly, Lucknow"
                      value={serviceAreas}
                      onChange={(e) => setServiceAreas(e.target.value)}
                    />
                  </div>
                </div>
              ) : null}
 
              {currentStep === 3 ? (
                <div>
                  <div className="grid sm:grid-cols-2 gap-x-4">
                    <div>
                      <FieldLabel required>Aadhaar Number</FieldLabel>
                      <InputField
                        icon={FaUser}
                        type="text"
                        placeholder="XXXX XXXX XXXX"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                      />
                      {errors.aadharNumber ? (
                        <p className="text-red-500 text-sm -mt-3 mb-4">{errors.aadharNumber}</p>
                      ) : null}
                    </div>
 
                    <div>
                      <FieldLabel required>PAN Number</FieldLabel>
                      <InputField
                        icon={FaUser}
                        type="text"
                        placeholder="ABCDE1234F"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                      />
                      {errors.panNumber ? <p className="text-red-500 text-sm -mt-3 mb-4">{errors.panNumber}</p> : null}
                    </div>
                  </div>
 
                  <FileUploadField
                    label="Aadhaar Front"
                    required
                    value={aadharFront}
                    fileName={aadharFrontFileName}
                    error={errors.aadharFront}
                    onChange={({ dataUrl, name }) => {
                      setAadharFront(dataUrl)
                      setAadharFrontFileName(name)
                    }}
                  />
 
                  <FileUploadField
                    label="Aadhaar Back"
                    required
                    value={aadharBack}
                    fileName={aadharBackFileName}
                    error={errors.aadharBack}
                    onChange={({ dataUrl, name }) => {
                      setAadharBack(dataUrl)
                      setAadharBackFileName(name)
                    }}
                  />
 
                  <FileUploadField
                    label="PAN Card"
                    required
                    value={panCard}
                    fileName={panCardFileName}
                    error={errors.panCard}
                    onChange={({ dataUrl, name }) => {
                      setPanCard(dataUrl)
                      setPanCardFileName(name)
                    }}
                  />
                </div>
              ) : null}
            </div>
 
            {errors.form ? <p className="text-red-500 text-sm mb-5">{errors.form}</p> : null}
            {success ? <p className="text-emerald-600 text-sm mb-5">{success}</p> : null}
 
            <div className="flex items-center gap-3 mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              ) : null}
 
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3.5 rounded-xl bg-[#05AFC7] text-white font-semibold hover:bg-[#049cb1] transition-colors shadow-sm"
                >
                  Next
                </button>
              ) : (
                <div className="flex-1">
                  <Button loading={loading} loadingText="Creating Account..." text="Create Account" />
                </div>
              )}
            </div>
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