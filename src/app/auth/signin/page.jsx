import { Suspense } from "react"
import SigninForm from "../../../Components/SigninForm"

const Signin = () => {
  return (
    <div className="bg-background-gradient w-full h-screen flex items-center justify-center">
      <Suspense fallback={null}>
        <SigninForm />
      </Suspense>
    </div>
  )
}

export default Signin
