"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import FormField from "@/components/ui/FormField";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { showToast } from "nextjs-toast-notify";
import { API_BASE } from "@/data";
import SocialMediaLogin from "@/components/ui/SocialMediaLogin";
import toast from "react-hot-toast";
const Signin = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const params = useSearchParams();
  const router = useRouter();
  const [login, { isLoading: loading, isSuccess }] = useLoginMutation();
  const user = useAppSelector(selectCurrentUser);
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

  const onSubmitForm = async (data: any) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(loginInfo).unwrap();

      console.log(res);
      if (res.data.accessToken) {
        const user = verifyToken(res.data.accessToken);

        dispatch(setUser({ user, token: res.data.accessToken }));
        Cookies.set("accessToken", res.data.accessToken);
      }
    } catch (error) {
      if (error.status === 404) {
        showToast.error("User Not Found Please Register", {
          duration: 4000,
          progress: true,
          position: "bottom-right",
          transition: "fadeIn",
          icon: "",
          sound: true,
        });
      }
      console.log(error);
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white dark:bg-dark-2 dark:shadow-xl shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark dark:text-white mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="mb-5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    label="Email Address"
                    name="email"
                    type="email"
                    control={control}
                    required
                    register={register}
                    errors={errors}
                    errorMessage="Email is Required"
                    placeholder="Enter Your Email Address"
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    autoComplete="off"
                    className="dark:bg-dark-2 bg-white"
                    required
                    label="Password"
                    name="password"
                    type="password"
                    control={control}
                    register={register}
                    errors={errors}
                    errorMessage="Password is Required"
                    placeholder="Enter Your Password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-pink py-3 px-6 rounded-lg ease-out duration-200 hover:bg-dark mt-7.5"
                >
                  Sign in to account
                </button>

                <a
                  href="#"
                  className="block text-center text-dark-4 dark:text-gray-5 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Forget your password?
                </a>

                <span className="relative z-1 block font-medium text-center mt-4.5">
                  <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                  <span className="inline-block px-3 bg-white dark:bg-dark-2">
                    Or
                  </span>
                </span>

                <SocialMediaLogin />

                <p className="text-center mt-6">
                  Don&apos;t have an account?
                  <Link
                    href="/signup"
                    className=" text-pink ease-out duration-200 hover:underline pl-2"
                  >
                    Sign Up Now!
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

export default Signin;
