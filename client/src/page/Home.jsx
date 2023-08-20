import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

import { FaHandHoldingHeart } from "react-icons/fa";

import { GiMagicLamp } from "react-icons/gi";

import { BsFire } from "react-icons/bs";

import { Link } from 'react-router-dom';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Welcome to </h1>
        <h1 className="font-extrabold text-[#222328] text-[64px] -mt-5">Vogue<span className='text-[#6469ff]'>Genie</span></h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated our VogueGenieGAN Model ✨</p>
      </div>

      <div className='mt-16 flex justify-between items-center'>
        <div className=" flex w-1/2">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className=' flex space-x-2'>
          <div className=' flex'>
            <Link to="/chatbot" className="font-inter flex font-medium text-[#6469ff] bg-[#dcdffd] justify-center items-center  px-4 py-2 rounded-md gap-2"><FaHandHoldingHeart />Recomended</Link>
          </div>
          <div className=' flex'>
            <Link to="/chatbot" className="font-inter flex font-medium text-[#6469ff] bg-[#dcdffd]  justify-center items-center px-4 py-2 rounded-md gap-2"><BsFire />Trending</Link>
          </div>
          <div className=' flex'>
            <Link to="/chatbot" className="font-inter flex font-medium text-[#6469ff] bg-[#dcdffd] justify-center items-center px-4 py-2 rounded-md gap-2"><GiMagicLamp className=' text-2xl'/> Chatbot</Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
