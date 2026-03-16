import { Suspense } from "react"
import SignupForm from "../../../Components/SignupForm";

const Signup = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 items-center justify-center">
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  )
}

export default Signup
