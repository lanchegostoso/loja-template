import StatusMessage from "@/components/shared/status-message";

export default function EditDadosAdicionais() {

  return (
    <div className="flex align-center justify-center">
        <p>Editar dados adicionais</p>
        <StatusMessage statusMessageProps={{
            title: "Indisponivel",
            type: "error",
            message: "Breve você poerá ver e editar suas informações"
        }}/>
    </div>
  )
}