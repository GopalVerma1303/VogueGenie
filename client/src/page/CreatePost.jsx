import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
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
    // <section className="max-w-7xl mx-auto">
    //   <div>
    //     <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
    //     <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
    //   </div>

    //   <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
    //     <div className="flex flex-col gap-5">
    //       <FormField
    //         labelName="Your Name"
    //         type="text"
    //         name="name"
    //         placeholder="Ex., john doe"
    //         value={form.name}
    //         handleChange={handleChange}
    //       />

    //       <FormField
    //         labelName="Prompt"
    //         type="text"
    //         name="prompt"
    //         placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
    //         value={form.prompt}
    //         handleChange={handleChange}
    //         isSurpriseMe
    //         handleSurpriseMe={handleSurpriseMe}
    //       />

    //       <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
    //         { form.photo ? (
    //           <img
    //             src={form.photo}
    //             alt={form.prompt}
    //             className="w-full h-full object-contain"
    //           />
    //         ) : (
    //           <img
    //             src={preview}
    //             alt="preview"
    //             className="w-9/12 h-9/12 object-contain opacity-40"
    //           />
    //         )}

    //         {generatingImg && (
    //           <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
    //             <Loader />
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     <div className="mt-5 flex gap-5">
    //       <button
    //         type="button"
    //         onClick={generateImage}
    //         className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    //       >
    //         {generatingImg ? 'Generating...' : 'Generate'}
    //       </button>
    //     </div>

    //     <div className="mt-10">
    //       <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
    //       <button
    //         type="submit"
    //         className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    //       >
    //         {loading ? 'Sharing...' : 'Share with the Community'}
    //       </button>
    //     </div>
    //   </form>
    // </section>
    // );
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
                  <div className='rounded-lg py-1 text-sm text-[#666e75]' key={index}>This is div {index + 1}</div>
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
          <div className=' h-full bg-white rounded-2xl shadow-lg flex flex-col justify-between p-3'>
            <div className=' flex flex-col overflow-y-auto my-5 -mt-0.5 w-64 p-3 h-64'>
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
              {/* {[...Array(100)].map((_, index) => (
                <div className='rounded-lg py-1 text-sm text-[#666e75]' key={index}>This is div {index + 1}</div>
              ))} */}
            </div>
            <div className=' flex px-5 py-4 bg-[#e6ebf4] rounded-xl'>
              <form onSubmit={handleSubmit} className='flex space-x-5 p-0 justify-between items-center flex-1'>
              <FormField
            // labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            // isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
                {/* <input 
                  className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                  type="text"
                  placeholder="Enter a prompt here"
                /> */}
                <button onClick={generateImage}
                  className="flex bg-[#6469ff] hover:opacity-50 text-white font-bold px-2 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {/* <PaperAirplaneIcon className="w-5 h-5" /> */} Send
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
};

export default CreatePost;
