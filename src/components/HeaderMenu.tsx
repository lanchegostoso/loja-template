"use client"

import * as React from "react"
import { BsSearchHeart } from "react-icons/bs";

export function HeaderMenu() {
  return (

    <div className='w-[100%] bg-primary fixed top-0 z-10' >
        <div className='w-[90%] mx-auto' >
            <div className='flex relative justify-end items-center gap-4 p-4'>
              <h6 className="text-white">Seja Bem Vindo(a)</h6>
              <div className="flex items-center gap-x-3 rounded-lg p-3 bg-gray-100">  
              <BsSearchHeart className="text-gray-400 w-8 h-8" />
                <div className="w-full">  
                  <input  
                    type="text"  
                    id="id"  
                    name="name"  
                    placeholder="Pesquise sua comida favorita..."  
                    className="w-full outline-none bg-transparent text-sm font-medium"  
                  />  
                </div>  
              </div>
            </div>
        </div>
    </div>

)}