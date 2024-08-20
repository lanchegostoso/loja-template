"use client"
import { useState, useEffect } from "react";
import { BsArrowRightShort, BsPersonCheckFill } from "react-icons/bs";
import { Card } from '@/components/ui/card';
import ButtonLink from "@/components/shared/button-link";
import UserHeader from "@/components/shared/user-header";
import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";
import { Users } from "@prisma/client";

export default function Page() {
    const [user, setUser] = useState<Partial<Users>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user/user-id");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 200 && data.user) {
                    setUser(data.user);
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false)
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col align-center justify-center text-gray-900">
            <UserHeader user={user} />
            <Card className="border-0 shadow-0 flex flex-col text-gray-900 gap-4 p-4">
                <ButtonLink
                    btnColor={"bg-primary hover:bg-primary-foreground"}
                    btnClass={"flex-row-reverse font-bold"}
                    btnText={"Cadastros e pagamentos - Retiro de Mulheres 2024"}
                    btnLink={"/administracao/lista"}
                    icon={BsPersonCheckFill}
                />
            </Card>
        </div>
    );
}
