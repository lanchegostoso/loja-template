import StatusMessage from "@/components/shared/status-message";

export default function EditDadosPessoais() {

    return (
      <div className="flex align-center justify-center">
          <p>Editar dados pessoais</p>
          <StatusMessage statusMessageProps={{
            title: "Indisponivel",
            type: "error",
            message: "Breve você poerá ver e editar suas informações"
        }}/>
      </div>
    )
  }