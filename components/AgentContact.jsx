"use client";
import React from "react";

const FloatingInput = ({ label, placeholder, type = "text" }) => {
  return (
    <div className="relative w-full group">
      <input
        type={type}
        placeholder={placeholder}
        className="block px-4 pb-2.5 pt-6 w-full text-white bg-transparent border border-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all placeholder:text-transparent focus:placeholder:text-gray-500"
      />
      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-white pointer-events-none">
        {label}
      </label>
    </div>
  );
};

const AgentContact = () => {
  return (
    <section className="max-w-7xl px-8 mx-auto my-20 overflow-hidden rounded-xl  flex flex-col md:flex-row min-h-[600px]">
      {/* Left side: Image */}
      <div className="md:w-5/12 relative min-h-[300px]">
        <img
          src="/agent.png"
          alt="Agent "
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side: Form Container */}
      <div className="md:w-7/12 bg-[#004d4a] p-10 md:p-16 flex flex-col">
        <h2 className="text-4xl md:text-5xl font-serif-elegant text-white mb-4 font-serif text-center">
          Make your next move
        </h2>
        <p className="text-gray-200 mb-10 text-lg text-center">
          Get matched with a local agent to help with all of your homebuying and
          selling needs.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput label="Full name" placeholder="Full name" />
            <FloatingInput label="Phone" placeholder="Phone" />
            <FloatingInput
              label="Postal code of interest"
              placeholder="Postal code"
            />
            <FloatingInput label="Email" placeholder="Email" />
          </div>

          <div className="relative w-full group mt-4">
            <textarea
              placeholder="Questions or comments "
              rows={4}
              className="block px-4 pb-2.5 pt-6 w-full text-white bg-transparent border border-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all resize-none  placeholder:text-transparent focus:placeholder:text-gray-500 "
              defaultValue="I'd like to ask a question about homes in Calgary"
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-6 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-white">
              Questions or comments
            </label>
          </div>

          <p className="text-[11px] text-gray-300 mt-6 leading-relaxed">
            Houseful will call you within the next business hour to match you
            with a Houseful™ network agent. By submitting this information, I
            acknowledge that I have read and agreed to the Terms of use.
          </p>

          <div className="flex items-start gap-3 mt-4 ">
            <input
              type="checkbox"
              className=" w-20   h-20 rounded border-gray-300 cursor-pointer"
            />
            <label className="text-[11px] text-gray-300">
              I would like to receive marketing and promotional messages by
              telephone, text message, and email from Houseful, including
              information and updates about properties of interest and the
              services and features of Houseful, RBC and of third parties we
              select that may benefit you. I understand that I may withdraw my
              consent at any time. Message and data rates may apply. I
              understand that I do not need to agree to receive these messages
              in order to receive real estate services.
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button className="mt-8 w-full md:w-auto px-10 py-4 bg-[#c1e837] text-slate-900 font-bold rounded-full hover:bg-[#aecf32] transition-colors cursor-pointer ">
              Match with an agent
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AgentContact;
