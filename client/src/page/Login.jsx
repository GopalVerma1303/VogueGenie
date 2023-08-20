import React from "react";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
import aladdinGenieImageSrc from "../assets/images/logo.png";
import Colors from "../assets/theme/colors";
import {
    FaFacebookF,
    FaGoogle,
    FaInstagram,
    FaLinkedin,
    FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const Login = () => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center  "
        >
            <div className="flex  shadow-2xl w-2/3 max-w-4xl rounded-2xl ">
                <div
                    className="w-2/5 py-32 px-12 rounded-2xl"
                    style={{ backgroundColor: Colors.purple }}
                >
                    <div className=" pb-3">
                        <h1 className="text-3xl font-bold mb-2 text-white">VogueGenie</h1>
                        <p className=" mb-5 font-light text-white">
                            Your AI Fashion Genie in a cart ✨
                        </p>
                        <div className="border-2 w-10 inline-block mb-10"></div>
                    </div>
                    <div className=" pt-3">
                        <img
                            src={aladdinGenieImageSrc}
                            width={300}
                            height={300}
                            alt="logo"
                        />
                    </div>
                </div>
                <div className="w-3/5 p-5">
                    <div className="py-10">
                        <p
                            className="text-3xl font-bold mb-2"
                            style={{ color: Colors.darkpurple }}
                        >
                            Login or Signup
                        </p>
                        <div
                            className="border-2 w-10 inline-block my-2"
                            style={{ borderColor: Colors.darkpurple }}
                        ></div>
                        <div className="flex justify-center my-2">
                            <button className=" border-2 border-gray-200 rounded-full p-3 mx-1">
                                <FaFacebookF className="text-sm" />
                            </button>
                            <button
                                className=" border-2 border-gray-200 rounded-full p-3 mx-1"
                                onClick={() => signIn("google")}
                            >
                                <FaGoogle className="text-sm" />
                            </button>
                            <button className=" border-2 border-gray-200 rounded-full p-3 mx-1">
                                <FaLinkedin className="text-sm" />
                            </button>
                        </div>
                        <p className=" text-gray-400 my-5">or use your email account</p>
                        <div className=" flex flex-col items-center">
                            <div className=" bg-gray-200 w-80 p-2 flex items-center mb-3">
                                <FaRegEnvelope className=" text-gray-400 m-2" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className=" flex-1 bg-gray-200 border-none text-sm"
                                />
                            </div>
                            <div className=" bg-gray-200 w-80 p-2 flex items-center mb-3">
                                <MdLockOutline className=" text-gray-400 m-2" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className=" flex-1 bg-gray-200 border-none text-sm"
                                />
                            </div>
                            <div className=" flex justify-between w-80 mb-5">
                                <label className=" flex justify-center items-center text-xs">
                                    <input type="checkbox" name="remmber" className="mr-1" />{" "}
                                    Remember me
                                </label>
                                <a href="#" className=" text-xs">Forget Password?</a>
                            </div>
                            <div className=" w-80 p-2 flex my-3 justify-center items-center rounded-lg" style={{ backgroundColor: Colors.purple }}>
                                <p className="text-white font-semibold">SIGN IN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
