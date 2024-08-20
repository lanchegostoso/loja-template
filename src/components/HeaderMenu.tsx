"use client"

import * as React from "react"
import { IoMdHeart } from "react-icons/io";
import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,} from "@/components/ui/navigation-menu"

export function HeaderMenu() {
  return (

    <div className='w-[100%] bg-primary fixed top-0 z-10' >
        <div className='w-[90%] mx-auto' >
            <div className='flex justify-end items-center gap-4 p-4'>
            <IoMdHeart className='w-6 h-6 fill-primary' />
              {/* <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-primary hover:bg-primary" >
                      <AiOutlineMenu color="#fff"className='w-6 h-6 transition duration-200 group-data-[state=open]:rotate-90' /></NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 px-10 py-4 bg-primary">
                      <NavigationMenuLink><Link href="/">Inicio</Link></NavigationMenuLink>
                      <NavigationMenuLink><Link href="retiro/cadastro/dadosPessoais">Participar</Link></NavigationMenuLink>
                      <NavigationMenuLink><Link href="/">Login</Link></NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu> */}
            </div>
        </div>
    </div>

)}