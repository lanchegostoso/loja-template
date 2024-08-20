"use client";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Button, Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle, Select, SelectItem } from '@/components/ui';
import { AlertSistem } from "@/components/shared";
import { Categoria } from '@prisma/client';

export default function ProdutoForm() {
  const [produto, setProduto] = React.useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 1,
    categoriaId: '',
    imagem: ''
  });
  const [categorias, setCategorias] = React.useState([]);
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
    const fetchData = async () => {
      try {
        const categoriasResponse = await axios.get('/api/adm/categoria-all-get', { headers: { 'Cache-Control': 'no-store' } });
        console.log('categoriasResponse' ,categoriasResponse.data);
        setCategorias(categoriasResponse.data.categorias);

        if (id) {
          const produtoResponse = await axios.get(`/api/adm/produto-get`);
          setProduto(produtoResponse.data);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categorias.length === 0) {
      setAlertMessage({
        title: 'Erro',
        message: 'Nenhuma categoria disponível. Não é possível cadastrar um produto sem categoria.'
      });
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/adm/product-get`, produto);
      } else {
        await axios.post('/api/adm/product-create', produto);
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      setAlertMessage({
        title: `Erro`,
        message: `Erro ao salvar produto: ${error.response?.data?.message || 'Verifique os dados e tente novamente.'}`
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? 'Editar Produto' : 'Criar Produto'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={produto.nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                name="descricao"
                value={produto.descricao}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                name="preco"
                type="number"
                value={produto.preco}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                value={produto.quantidade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="categoriaId">Categoria</Label>
              <select
                id="categoriaId"
                name="categoriaId"
                value={produto.categoriaId}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria:Categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="imagem">Imagem</Label>
              <Input
                id="imagem"
                name="imagem"
                value={produto.imagem}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : id ? 'Salvar Alterações' : 'Criar Produto'}
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
