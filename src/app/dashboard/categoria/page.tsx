"use client";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Button, Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { AlertSistem } from "@/components/shared";

export default function CategoriaForm() {
  const [categoria, setCategoria] = React.useState({ nome: '', descricao: '' });
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<{ title: string, message: string }>({
    title: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  React.useEffect(() => {
    if (id) {
      axios.get(`/api/adm/categoria-get`)
        .then((response) => {
          setCategoria(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar a categoria:', error);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoria((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/adm/categoria-put`, categoria);
      } else {
        await axios.post('/api/adm/categoria-create', categoria);
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro ao salvar categoria:', error);
      setAlertMessage({
        title: `Erro`,
        message: `Erro ao salvar categoria: ${error.response?.data?.message || 'Verifique os dados e tente novamente.'}`
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? 'Editar Categoria' : 'Criar Categoria'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={categoria.nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                name="descricao"
                value={categoria.descricao}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : id ? 'Salvar Alterações' : 'Criar Categoria'}
          </Button>
        </CardFooter>
      </form>
      <AlertSistem
        title={alertMessage.title}
        message={alertMessage.message}
        onClose={() => setAlertVisible(false)}
        show={alertVisible}
      />
    </Card>
  );
}
