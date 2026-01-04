'use client'

import { useRouter } from 'next/router'

import { z } from 'zod'
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select'

import { Checkbox } from '@/components/UI/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/UI/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover'

import { Button } from '@/components/UI/button'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, UserPlus2 } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/UI/command'

import { Input } from '@/components/UI/Input'

import { zodResolver } from '@hookform/resolvers/zod'

import { ICity } from '@/schema/City'
import { IVehicle } from '@/schema/Vehicle'
import { IClient } from '@/schema/Client'
import { IApolice } from '@/schema/Apolice'
import { Modal } from '../Modal'
import { CreateProfileForm } from './CreateProfileForm'
import { useState } from 'react'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'

const registerSinistroSchema = z.object({
  apolice: z.string(),
  cidade: z.string().nonempty({ message: 'Campo obrigatório' }),
  danos_materiais_veiculos: z.boolean().default(false),
  danos_materiais_objectos: z.boolean().default(false),
  ferimentos: z.boolean().default(false),
  data: z.string(),
  descricao: z.string().nonempty(),
  rua: z.string().nonempty(),
  morada: z.string().nonempty(),
  tomador: z.string(),
  tomador_veiculo: z.string(),
  observacoes_segurado: z.string(),
  observacoes_tomador: z.string(),
})

type RegisterSinistroData = z.infer<typeof registerSinistroSchema>

interface RegisterSinistroFormProps {
  cities: ICity[]
  vehicles: IVehicle[]
  clients: IClient[]
  apolices: IApolice[]
}

export function RegisterSinistroForm({
  apolices,
  cities,
  clients,
  vehicles,
}: RegisterSinistroFormProps) {
  const router = useRouter()
  const [isModalToOpen, setIsModalOpen] = useState(false)

  const form = useForm<RegisterSinistroData>({
    resolver: zodResolver(registerSinistroSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form

  async function handleRegisterSinistro(data: RegisterSinistroData) {
    const newSinistro = {
      sinistros: {
        ...data,
        apolice: Number(data.apolice.split('-')[0]),
        cidade: Number(data.cidade.split('-')[0]),
        tomador_veiculo: Number(data.tomador_veiculo.split('-')[0]),
        tomador: Number(data.tomador),
        ferimentos: data.ferimentos ? 1 : 0,
        danos_materiais_veiculos: data.danos_materiais_veiculos ? 1 : 2,
        danos_materiais_objectos: data.danos_materiais_objectos ? 1 : 2,
      },
    }

    try {

 const post =  await api.post('sinistros', newSinistro)
      if(post.data.status === '200'){
          toast.success('Sinistro registrado com sucesso')
          await router.push('/sinistros')
      }else{
        toast.error(post.data.status)
      }
    } catch (err) {
      toast.error('Não foi possível Registar o sinistro')
    }
  }

  function toggleModal() {
    setIsModalOpen(!isModalToOpen)
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={handleSubmit(handleRegisterSinistro)}
        className="bg-gray-50 flex flex-col gap-4 p-4 rounded"
      >
        <div className="py-4 font-medium border-b border-gray-400 text-gray-800">
          <h3 className="text-xl">Dados do sinistro</h3>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="apolice"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm font-normal text-gray-600">
                  Apolice
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between font-normal bg-transparent',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? apolices.find(
                              (apolice) =>
                                `${
                                  apolice.ID
                                }-${apolice.NUMERO.toLowerCase()}/${apolice.CLIENTE.toLowerCase()}` ===
                                field.value,
                            )?.NUMERO
                          : 'Selecione o apólice'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="Pesquise o apólice..." />
                      <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                      <CommandGroup>
                        {apolices?.length > 0 &&
                          apolices.map((apolice) => (
                            <CommandItem
                              value={`${
                                apolice.ID
                              }-${apolice.NUMERO.toLowerCase()}/${apolice.CLIENTE.toLowerCase()}`}
                              key={apolice.ID}
                              onSelect={(value) => {
                                form.setValue('apolice', value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  `${
                                    apolice.ID
                                  }-${apolice.NUMERO.toLowerCase()}/${apolice.CLIENTE.toLowerCase()}` ===
                                    field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {`${apolice.CLIENTE}(${apolice.NUMERO})`}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            name="tomador"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-gray-600">
                  Tomador
                </FormLabel>
                <div className="flex items-center gap-2">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tomador" />
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
                    onClose={toggleModal}
                    isOpen={isModalToOpen}
                    title="Criar tomador"
                    trigger={
                      <UserPlus2
                        onClick={toggleModal}
                        size={20}
                        className="text-amber-600 hover:text-amber-700"
                      />
                    }
                  >
                    <CreateProfileForm onClose={toggleModal} />
                  </Modal>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="tomador_veiculo"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm font-normal text-gray-600">
                  Veículo do tomador
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between font-normal bg-transparent',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? vehicles.find(
                              (vehicle) =>
                                `${
                                  vehicle.ID
                                }-${vehicle.MARCA.toLowerCase()}/${vehicle.MODELO.toLowerCase()}/${vehicle.MATRICULA.toLowerCase()}` ===
                                field.value,
                            )?.MARCA
                          : 'Selecione o veículo'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="Pesquise o veículo..." />
                      <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                      <CommandGroup>
                        {vehicles?.length > 0 &&
                          vehicles.map((vehicle) => (
                            <CommandItem
                              value={`${
                                vehicle.ID
                              }-${vehicle.MARCA.toLowerCase()}/${vehicle.MODELO.toLowerCase()}/${vehicle.MATRICULA.toLowerCase()}`}
                              key={vehicle.ID}
                              onSelect={(value) => {
                                form.setValue('tomador_veiculo', value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  `${
                                    vehicle.ID
                                  }-${vehicle.MARCA.toLowerCase()}/${vehicle.MODELO.toLowerCase()}/${vehicle.MATRICULA.toLocaleUpperCase()}` ===
                                    field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {`${vehicle.MARCA}-${vehicle.MODELO}(${vehicle.MATRICULA})`}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <div className="flex flex-col ">
            <label htmlFor="data" className="text-sm font-normal text-gray-600">
              Data
            </label>
            <Input
              id="data"
              type="date"
              {...register('data')}
              className="mt-2"
            />{' '}
          </div>
        </div>

        <div className="py-4 font-medium border-b border-gray-400 text-gray-800">
          <h3 className="text-xl">Detalhes</h3>
        </div>

        <div className="grid gri-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="obs_tomador" className="text-sm text-gray-600">
              Descrição do sinistro:
            </label>
            <textarea
              placeholder="Descreva o sinistro com o máximo de detalhes possível."
              className="resize-none text-sm bg-transparent border border-zinc-200 rounded-lg outline-none p-4"
              {...register('descricao')}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="obs_tomador" className="text-sm text-gray-600">
              Observações do segurado:
            </label>
            <textarea
              className="resize-none text-sm border border-zinc-200 bg-transparent rounded-lg outline-none p-4"
              {...register('observacoes_segurado')}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="obs_tomador" className="text-sm text-gray-600">
              Observações do tomador:
            </label>
            <textarea
              className="resize-none text-sm bg-transparent border border-zinc-200 rounded-lg outline-none p-4"
              {...register('observacoes_tomador')}
            />
          </div>
        </div>

        <div className="grid gri-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            name="danos_materiais_veiculos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Danos materiais no veículo</FormLabel>
                  <FormDescription>Ocorreram danos no veículo.</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="danos_materiais_objectos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Objectos danificados</FormLabel>
                  <FormDescription>
                    Foram danificados objectos à volta do acidente.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="ferimentos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Ferimentos</FormLabel>
                  <FormDescription>
                    O Acidente gerou ferimentos a pessoas
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="py-4 font-medium border-b border-gray-400 text-gray-800">
          <h3 className="text-xl">Localização</h3>
        </div>

        <div className="grid gri-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm font-normal text-gray-600">
                  Cidade
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between font-normal bg-transparent',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? cities.find(
                              (city) =>
                                `${city.ID}-${city.NOME.toLowerCase()}` ===
                                field.value,
                            )?.NOME
                          : 'Selecione a cidade'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Pesquise a cidade..." />
                      <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                      <CommandGroup>
                        {cities?.length > 0 &&
                          cities.map((city) => (
                            <CommandItem
                              value={`${city.ID}-${city.NOME.toLowerCase()}`}
                              key={city.ID}
                              onSelect={(value) => {
                                form.setValue('cidade', value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  `${city.ID}-${city.NOME.toLowerCase()}` ===
                                    field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {city.NOME}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <label htmlFor="morada" className="text-sm text-gray-600">
              Morada
            </label>
            <Input id="morada" placeholder="Morada" {...register('morada')} />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="rua" className="text-sm text-gray-600">
              Rua
            </label>
            <Input id="rua" placeholder="Rua" {...register('rua')} />
          </div>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-gray-100 text-lg py-4 rounded-lg disabled:bg-amber-600/30 disabled:cursor-not-allowed"
        >
          Registar Sinistro
        </button>
      </form>
    </Form>
  )
}
