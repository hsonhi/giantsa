'use client'

import { useRouter } from 'next/router'

import { Input } from '../UI/Input'
import { IClient } from '@/schema/Client'
import { ITypesApolice } from '@/schema/TypesApolice'
import { IVehicle } from '@/schema/Vehicle'
import { ITypology } from '@/schema/Typology'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/UI/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { api } from '@/lib/axios'

import { LoaderIcon, UserPlus2 } from 'lucide-react'
import { Modal } from '../Modal'
import { CreateProfileForm } from './CreateProfileForm'

import { useState } from 'react'

const createApoliceSchema = z.object({
  cliente: z.string({ required_error: 'Campo obrigatório' }),
  veiculo: z.string({ required_error: 'Campo obrigatório' }),
  tipo: z.string({ required_error: 'Campo obrigatório' }),
  numero: z.string(),
  tipologia: z.string({ required_error: 'Campo obrigatório' }),
  valor: z.string().nonempty({ message: 'O valor é obrigatório' }),
  data_inicio: z.string({ required_error: 'Campo obrigatório' }),
  data_fim: z.string({ required_error: 'Campo obrigatório' }),
  desconto: z.number({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'O desconto deve ser um número',
  }),
})

type CreateApoliceData = z.infer<typeof createApoliceSchema>

interface CreateApoliceFormProps {
  clients: IClient[]
  vehicles: IVehicle[]
  types: ITypesApolice[]
  typologies: ITypology[]
}

export function CreateApoliceForm({
  clients,
  types,
  typologies,
  vehicles,
}: CreateApoliceFormProps) {
  const router = useRouter()
  const [isModalToCreateProfileOpen, setIsModalToCreateProfileOpen] =
    useState(false)
  const form = useForm<CreateApoliceData>({
    resolver: zodResolver(createApoliceSchema),
    defaultValues: {
      numero: `AUP-${Math.random().toString(36).substring(7).toUpperCase()}`,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form

  const currentDate = new Date().toISOString().split('T')[0] // 2023-05-17

  async function handleRegisterApolice(data: CreateApoliceData) {
    const newApolices = {
      apolices: {
        ...data,
        cliente: Number(data.cliente),
        veiculo: Number(data.veiculo),
        tipo: Number(data.tipo),
        tipologia: Number(data.tipologia),
        valor: parseFloat(data.valor).toFixed(2),
      },
    }

    try {
      const post =  await api.post('apolices', newApolices)
      if(post.data.status === '200'){
          toast.success('Apólice criada com sucesso')
          await router.push('/apolices')
      }else{
        toast.error(post.data.status)
      }
    
    } catch (err) {
      toast.error('Não foi possível Registar a apólice')
    }
  }

  function toggleModalState() {
    setIsModalToCreateProfileOpen(!isModalToCreateProfileOpen)
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={handleSubmit(handleRegisterApolice)}
        className="bg-gray-50 flex flex-col gap-4 p-4 rounded"
      >
        <div className="py-4 font-medium border-b border-gray-400 text-gray-800">
          <h3 className="text-xl">Dados da apólice</h3>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col gap-4 ">
              <FormField
                name="cliente"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-normal text-gray-600">
                      Cliente
                    </FormLabel>
                    <div className="flex gap-2">
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem
                              key={client.ID}
                              value={client.ID.toString()}
                            >
                              {client.NOME}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Modal
                        onClose={toggleModalState}
                        isOpen={isModalToCreateProfileOpen}
                        title="Criar cliente"
                        trigger={
                          <UserPlus2
                            onClick={toggleModalState}
                            size={20}
                            className="text-amber-600 hover:text-amber-700"
                          />
                        }
                      >
                        <CreateProfileForm onClose={toggleModalState} />
                      </Modal>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              name="veiculo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Veículo
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem
                          key={vehicle.ID}
                          value={vehicle.ID.toString()}
                        >
                          {vehicle.MATRICULA}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div>
            <FormField
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Tipo
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de apólice" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.ID} value={type.ID.toString()}>
                          {type.NOME}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              name="tipologia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Tipologia
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma tipologia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typologies.map((typology) => (
                        <SelectItem
                          key={typology.ID}
                          value={typology.ID.toString()}
                        >
                          {typology.TIPOLOGIA}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="numero" className="text-sm text-gray-600">
              Data de início
            </label>
            <Input type="date" min={currentDate} {...register('data_inicio')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="numero" className="text-sm text-gray-600">
              Data final
            </label>
            <Input type="date" min={currentDate} {...register('data_fim')} />
          </div>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="numero" className="text-sm text-gray-600">
              Valor
            </label>
            <Input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              {...register('valor')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="numero" className="text-sm text-gray-600">
              Desconto
            </label>
            <Input
              type="number"
              defaultValue={0}
              {...register('desconto', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="numero" className="text-sm text-gray-600">
              Número (Gerado automáticamente)
            </label>
            <Input
              disabled
              placeholder="Gerado automáticamente"
              {...register('numero')}
            />
          </div>
        </div>

        <button
          disabled={!isValid || isSubmitting}
          className="bg-amber-600 hover:bg-amber-700 text-gray-100 text-lg py-4 rounded-lg  disabled:cursor-not-allowed disabled:bg-amber-700/30"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center text-base gap-2">
              <LoaderIcon className="h-4 w-4 animate-spin" />A processar...
            </span>
          ) : (
            'Guardar'
          )}
        </button>
      </form>
    </Form>
  )
}
