import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { BiMessageSquareDetail, BiMenu } from "react-icons/bi";
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { AiFillLike, AiFillDislike, AiOutlineShareAlt } from "react-icons/ai";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import HowCanIHelp from '../components/HowCanIHelp';

import UserMessage from '../components/UserMessage';
import GenieMessage from '../components/GenieMessage';

const CreatePost = () => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [form, setForm] = useState({
    name: 'Gopal Verma',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      setSend(true);
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/vogueGenie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="h-[calc(100vh-140px)]">
      <div className="flex h-full">
        <div className=" w-1/5 h-full p-3">
          <div className=' h-full rounded-2xl p-2 justify-between flex flex-col'>
            <div>
              <div className=' bg-[#6469ff] justify-center items-center flex rounded-lg py-2 text-white hover:cursor-pointer'>
                <p>+ New Chat</p>
              </div>
              <div className='my-3 px-2  overflow-y-auto h-[calc(100vh-290px)] '>
                {[...Array(10)].map((_, index) => (
                  <div className='rounded-lg py-1 items-center justify-between flex text-sm text-[#666e75]' key={index}>
                    <div className=' flex items-center'>
                      <div className=' flex justify-center items-center bg-gray-200 rounded-full p-2 mr-1'>
                        <BiMessageSquareDetail />
                      </div>
                      <p className=' hover:cursor-pointer'>Chat #{index+1}</p>
                    </div>
                    <div className=' justify-center items-center flex hover:cursor-pointer'>
                      <BiMenu />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className=' border border-[#6469ff] justify-center items-center flex rounded-lg py-2 text-[#6469ff] hover:cursor-pointer'>
                <p>Options</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-full p-3">
          <form onSubmit={handleSubmit} >
            <div className=' h-full bg-white rounded-2xl shadow-lg flex flex-col justify-between'>
              <div className=' flex flex-col overflow-y-auto h-[calc(100vh-235px)] my-5 -mt-0.5 p-4'>
                <HowCanIHelp />
                {/* {[...Array(100)].map((_, index) => (
                <div className='rounded-lg py-1 text-sm text-[#666e75]' key={index}>This is div {index + 1}</div>
              ))} */}
                <div className=' w-full flex justify-end pr-5 my-3'>
                  {
                    send && (<UserMessage message={form.prompt} />)
                  }
                </div>
                <div style={{ height: 300, width: 300 }}>

                  {
                    form.photo && (
                      //   <img
                      //     src={form.photo}
                      //     alt={form.prompt}
                      //     className="w-full h-full rounded-tr-2xl rounded-tl-2xl rounded-br-2xl"
                      //   />
                      <>
                        <img
                          src={form.photo}
                          alt={form.prompt}
                          className="w-full h-full rounded-tr-2xl rounded-tl-2xl rounded-br-2xl"
                        />
                        <div className=' flex space-x-1 w-full '>
                          <button type='submit' className=' flex bg-[#dcdffd] rounded-lg p-2 px-5 text-[#6469ff] mt-1 text-xs font-bold hover:cursor-pointer'>
                            {/* <p>Share with the Community</p> */}
                            {loading ? 'Sharing...' : <p className='flex justify-center items-center'><AiOutlineShareAlt className="w-4 h-4 mx-1" /> Share with the Community</p>}
                          </button>
                          <div className='flex  bg-[#dcdffd] rounded-lg p-2  text-lg text-[#6469ff] mt-1 justify-center items-center hover:cursor-pointer'>
                            <AiFillLike />
                          </div>
                          <div className='flex bg-[#dcdffd] rounded-lg p-2 text-lg text-[#6469ff] mt-1  justify-center items-center hover:cursor-pointer'>
                            <AiFillDislike />
                          </div>
                        </div>
                      </>
                    )


                  }

                  {/* <Loader /> */}
                </div>

              </div>
              <div className=' flex px-5 py-4 bg-[#e6ebf4] rounded-xl justify-between'>
                <FormField
                  className="bg-transparent text-white focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                  type="text"
                  placeholder="What you are looking for....?"
                  labelName="Prompt"
                  name="prompt"
                  value={form.prompt}
                  
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
                />
                <button
                  className="flex bg-[#6469ff] hover:opacity-50 text-white font-bold px-2 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  type="button"
                  onClick={generateImage}
                >
                  {
                    generatingImg ? "Generating..." : <PiPaperPlaneRightBold className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section >

  )
};

export default CreatePost;
