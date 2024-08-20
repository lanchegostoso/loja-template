'use client'
import { useState, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Users } from "@prisma/client";
import { Card } from '@/components/ui/card';
import ButtonLink from "@/components/shared/button-link";
import UserHeader from "./components-local/user-header";
import './user-style.css';
import LoadingComponent from "@/components/LoadingComponent";

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
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchUserAnaminese = async () => {
            try {
                const response = await fetch("/api/user/user-get-anaminese");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user anaminese data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
        fetchUserAnaminese();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col align-center justify-center text-gray-900">
            <UserHeader user={user} />
             <Card className="border-0 shadow-0 flex flex-col gap-4 p-4">
            <ButtonLink
                btnClass={"p-6 flex items-center justify-between bg-primary hover:bg-primary-foreground"}
                btnText={"Informações sobre o Ingresso do Retiro de Mulheres 2024"}
                btnLink={"/user/meu-ingresso"}
                icon={BsArrowRightShort}
            />
        </Card>
        </div>
    );
}
