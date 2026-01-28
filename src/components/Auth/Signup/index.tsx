"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import FormField from "@/components/ui/FormField";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "nextjs-toast-notify";
import ButtonLoading from "@/components/ui/Loader/ButtonLoading";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import SocialMediaLogin from "@/components/ui/SocialMediaLogin";
const Signup = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [signup, { isLoading: loading }] = useSignupMutation();
  const params = useSearchParams();
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const redirectTo = params.get("redirect");

  useEffect(() => {
    if (user?.role) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/");
      }
    }
  }, [user, redirectTo, router]);

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);
  const onSubmitForm = async (data: any) => {
    const userInfo = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    const res = await signup(userInfo).unwrap();
    console.log(res);
    if (res.data.accessToken) {
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      Cookies.set("accessToken", res.data.accessToken);
    }
    if (res.success) {
      reset();

      showToast.success("Signup Successfully", {
        duration: 4000,
        progress: true,
        position: "bottom-right",
        transition: "fadeIn",
        icon: "",
        sound: true,
      });
      router.push(redirectTo || "/");
    }
  };
  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white dark:bg-dark-2 shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark dark:text-white mb-1.5">
                Create an Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <SocialMediaLogin />

            <span className="relative z-1 block font-medium text-center mt-4.5">
              <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
              <span className="inline-block px-3 bg-white dark:bg-dark-2">
                Or
              </span>
            </span>

            <div className="mt-5.5">
              <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="mb-5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Full Name"
                    required
                    register={register}
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    errors={errors}
                    errorMessage="Full Name is Required"
                  />
                </div>
                <div className="mb-5 ">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Phone"
                    required
                    register={register}
                    type="text"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    errors={errors}
                    errorMessage="Phone Number is Required"
                    rules={{
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phone number must contain only numbers",
                      },
                      minLength: {
                        value: 11,
                        message: "Phone number must be at least 11 digits",
                      },
                    }}
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Email Address"
                    required
                    register={register}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    errors={errors}
                    errorMessage="Email Address is Required"
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Password"
                    required
                    register={register}
                    type="password"
                    name="password"
                    placeholder="Enter a New Password"
                    errors={errors}
                    errorMessage="New Password is Required"
                    rules={{
                      minLength: {
                        value: 8,
                        message: "Password Must be at least 8 characters",
                      },
                    }}
                  />
                </div>

                <div className="mb-5.5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Re-Type Password"
                    required
                    register={register}
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Password Again"
                    errors={errors}
                    rules={{
                      validate: (value: string) =>
                        value === password || "Password did not match",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-pink mt-7.5"
                >
                  {loading ? <ButtonLoading /> : "Create Account"}
                </button>

                <p className="text-center mt-6">
                  Already have an account?
                  <Link
                    href="/signin"
                    className=" ease-out duration-200 text-pink pl-2"
                  >
                    Sign in Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
