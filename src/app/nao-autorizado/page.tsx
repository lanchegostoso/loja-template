import StatusMessage from "@/components/shared/status-message";

export default async function Page() {
        return <StatusMessage statusMessageProps={{
            title: "Erro 403",
            type: "error",
            message: "Acesso não autorizado"
        }}/>
    }