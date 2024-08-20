'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { BsFillEyeFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";
import { Users } from "@prisma/client";
import ButtonBack from "@/components/shared/btn-back";
import { Card } from "@/components/ui";
import ButtonLink from "@/components/shared/button-link";

export default function Page() {
    const [allUser, setAllUser] = useState<Partial<Users>[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllusers = async () => {
            try {
                const response = await fetch("/api/adm/get-all-users");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.allUser)

                if (data.status === 200) {
                    setAllUser(data.allUser);
                } else {
                    setAllUser(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user anaminese data:", error);
                setLoading(false);
            }
        };
        fetchAllusers();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
            <div className="max-w-[380px] ">
                  {allUser ? allUser.map((user) => (
                    <Card className="p-4 border-0 bg-primary-foreground mb-8" key={user.id}>
                        <p>Nome : <span>{user.name}</span></p>
                        <p>Status  : <span></span></p>
                        <p>Pagamento: <span></span></p>
                        <ButtonLink
                            btnClass={"text-center text-white font-bold justify-center"}
                            btnText={"Ver mais"}
                            btnLink={`/administracao/lista/${user.id}`}
                        />
                    </Card>
                    )): <Card className="p-4 border-0 bg-primary-foreground" >Não Foi possivel carregar a lista</Card>}
               
                <ButtonBack/>
            </div>
    );
}
