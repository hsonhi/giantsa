'use client'

import { useForm } from 'react-hook-form'
import { Input } from '../UI/Input'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/UI/command'
import { RadioGroup, RadioGroupItem } from '@/components/UI/radio-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select'
import { Check, ChevronsUpDown, LoaderIcon } from 'lucide-react'
import { ICity } from '@/schema/City'
import { IJob } from '@/schema/Job'
import { CStatus } from '@/schema/CStatus'
import { Button } from '../UI/button'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const createProfileSchema = z.object({
  nome: z.string().nonempty({ message: 'Campo obrigatório' }),
  data_nascimento: z.string(),
  sexo: z.string().default('M'),
  estado_civil: z.string(),
  nib: z.string().optional(),
  nif: z.string(),
  filiacao_pai: z.string().nonempty({ message: 'Campo obrigatório' }),
  filiacao_mae: z.string().nonempty({ message: 'Campo obrigatório' }),
  naturalidade: z.string().nonempty({ message: 'Campo obrigatório' }),
  profissao: z.string().nonempty({ message: 'Campo obrigatório' }),
  renumeracao: z.string().nonempty({ message: 'Campo obrigatório' }),
  tipo: z.string().nonempty({ message: 'Campo obrigatório' }),
  doc_numero: z.string().nonempty({ message: 'Campo obrigatório' }),
  doc_data_emissao: z.string().nonempty({ message: 'Campo obrigatório' }),
  doc_data_validade: z.string().nonempty({ message: 'Campo obrigatório' }),
  aut_numero: z.string().nonempty({ message: 'Campo obrigatório' }),
  aut_data_emissao: z.string().nonempty({ message: 'Campo obrigatório' }),
  aut_data_validade: z.string().nonempty({ message: 'Campo obrigatório' }),
  telefone: z.number().nonnegative({ message: 'Número negativo' }),
  telefone_alternativo: z.number().nonnegative({ message: 'Número negativo' }),
  email: z
    .string()
    .email('Formato de e-mail inválido')
    .nonempty({ message: 'Campo obrigatório' }),
  caixa_postal: z.string().optional(),
  cidade: z.string().nonempty({ message: 'Campo obrigatório' }),
  morada: z.string().nonempty({ message: 'Campo obrigatório' }),
  rua: z.string().nonempty({ message: 'Campo obrigatório' }),
})

type CreateProfileData = z.infer<typeof createProfileSchema>

const jobs: IJob[] = [
  {
    ID: 11036,
    NOME: 'Advogado',
    INSERIDO_POR: 1,
    ACTUALIZADO_POR: null,
    REMOVIDO_POR: null,
    DATA_INSERCAO: new Date('2023-07-08 13:07:12'),
    DATA_ACTUALIZACAO: null,
    DATA_REMOCAO: null,
  },
  {
    ID: 11286,
    NOME: 'Engenheiro(a)',
    INSERIDO_POR: 1,
    ACTUALIZADO_POR: null,
    REMOVIDO_POR: null,
    DATA_INSERCAO: new Date('2023-07-08 13:07:12'),
    DATA_ACTUALIZACAO: null,
    DATA_REMOCAO: null,
  },
  {
    ID: 11336,
    NOME: 'Arquiteto',
    INSERIDO_POR: 1,
    ACTUALIZADO_POR: null,
    REMOVIDO_POR: null,
    DATA_INSERCAO: new Date('2023-07-08 13:07:12'),
    DATA_ACTUALIZACAO: null,
    DATA_REMOCAO: null,
  },
  {
    ID: 13863,
    NOME: 'Conta própria',
    INSERIDO_POR: 1,
    ACTUALIZADO_POR: null,
    REMOVIDO_POR: null,
    DATA_INSERCAO: new Date('2023-07-08 13:07:12'),
    DATA_ACTUALIZACAO: null,
    DATA_REMOCAO: null,
  },
]

interface CreateProfileFormProps {
  onClose: () => void
}

export function CreateProfileForm({ onClose }: CreateProfileFormProps) {
  const [cities, setCities] = useState<ICity[]>([])
  const [cStatus, setCStatus] = useState<CStatus[]>([])

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const cityResponse = await api.get('/city')
        const cStatusResponse = await api.get('/cstatus')

        const citiesData = cityResponse.data['']
        const cStatusData = cStatusResponse.data['']

        setCities(citiesData)
        setCStatus(cStatusData)
      } catch (error) {
        console.log('Erro ao carregar os dados', error)
      }
    }

    fetchData()
  }, [])

  const form = useForm<CreateProfileData>({
    resolver: zodResolver(createProfileSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  async function handleCreateProfile(data: CreateProfileData) {
    const newProfile = {
      clients: {
        nome: data.nome,
        data_nascimento: data.data_nascimento,
        sexo: data.sexo,
        nib: data.nib,
        nif: data.nif,
        estado_civil: Number(data.estado_civil),
        filiacao_pai: data.filiacao_pai,
        filiacao_mae: data.filiacao_mae,
        naturalidade: Number(data.naturalidade.split('-')[0]),
        profissao: Number(data.profissao),
        renumeracao: Number(data.renumeracao),
        documentacao: {
          pessoal: {
            tipo: Number(data.tipo),
            numero: data.doc_numero,
            data_emissao: data.doc_data_emissao,
            data_validade: data.doc_data_validade,
          },
          automovel: {
            numero: data.aut_numero,
            data_emissao: data.aut_data_emissao,
            data_validade: data.aut_data_validade,
          },
        },

        contactos: {
          telefone: data.telefone,
          telefone_alternativo: data.telefone_alternativo,
          email: data.email,
          caixa_postal: data.caixa_postal,
        },
        endereco: {
          cidade: Number(data.naturalidade.split('-')[0]),
          morada: data.morada,
          rua: data.rua,
        },
      },
    }

    try {
      await api.post('', newProfile)

      toast.success('Cliente criado com sucesso')
      onClose()
      reset()
      router.replace(router.asPath)
    } catch (err) {
      toast.error('Não foi possível criar o cliente')
    }
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateProfile)}
        className="mt-2 flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600">
              Nome
            </label>
            <Input id="name" placeholder="Nome" {...register('nome')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm text-gray-600">
              Data de nascimento
            </label>
            <Input id="date" type="date" {...register('data_nascimento')} />
          </div>

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem className="">
                  <label className="text-sm font-normal text-gray-600">
                    Gênero
                  </label>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue="M"
                      className="flex items-center space-y-1 border h-10 rounded-md px-4 bg-zinc-100"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="M" />
                        </FormControl>
                        <FormLabel className="font-normal">Masculino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="F" />
                        </FormControl>
                        <FormLabel className="font-normal">Feminino</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <FormField
              name="estado_civil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Estado civil
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma tipologia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cStatus?.length > 0 &&
                        cStatus.map((status) => (
                          <SelectItem
                            key={status.ID}
                            value={status.ID.toString()}
                          >
                            {status.NOME}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nib" className="text-sm text-gray-600">
              NIB
            </label>
            <Input id="nib" {...register('nib')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nif" className="text-sm text-gray-600">
              NIF
            </label>
            <Input id="nif" {...register('nif')} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="naturalidade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Naturalidade
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'justify-between font-normal',
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
                                  form.setValue('naturalidade', value)
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pai" className="block text-sm text-gray-600">
              Nome do pai
            </label>
            <Input id="pai" {...register('filiacao_pai')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mae" className="text-sm text-gray-600">
              Nome da mãe
            </label>
            <Input id="mae" {...register('filiacao_mae')} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="profissao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Profissão
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma profissão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobs?.length > 0 &&
                        jobs.map((job) => (
                          <SelectItem key={job.ID} value={job.ID.toString()}>
                            {job.NOME}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="remuneracao" className="text-sm text-gray-600">
              Remuneração
            </label>
            <Input
              inputMode="decimal"
              id="remuneracao"
              type="number"
              step={0.1}
              {...register('renumeracao')}
            />
          </div>
        </div>

        <hr />

        <strong>Documento</strong>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Tipo de documento
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">BI</SelectItem>
                      <SelectItem value="2">Passaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Número</label>
            <Input {...register('doc_numero')} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Data de emissão</label>
            <Input type="date" {...register('doc_data_emissao')} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Data de validade</label>
            <Input
              id="data_validade"
              type="date"
              {...register('doc_data_validade')}
            />
          </div>
        </div>

        <hr />

        <strong>Automóvel</strong>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Matrícula</label>
            <Input {...register('aut_numero')} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Data de emissão</label>
            <Input type="date" {...register('aut_data_emissao')} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Data de validade</label>
            <Input type="date" {...register('aut_data_validade')} />
          </div>
        </div>

        <hr />

        <strong>Contactos</strong>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Telefone</label>
            <Input {...register('telefone', { valueAsNumber: true })} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Telefone Alt.</label>
            <Input
              {...register('telefone_alternativo', { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">E-mail</label>
            <Input type="email" {...register('email')} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Caixa Postal</label>
            <Input type="text" {...register('caixa_postal')} />
          </div>
        </div>

        <hr />

        <strong>Endereço</strong>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                            'justify-between font-normal',
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Morada</label>
            <Input {...register('morada')} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Rua</label>
            <Input {...register('rua')} />
          </div>
        </div>

        <button
          type="submit"
          className="bg-amber-600 py-2 rounded-md hover:bg-amber-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center text-base gap-2">
              <LoaderIcon className="h-4 w-4 animate-spin" />A processar...
            </span>
          ) : (
            'Salvar'
          )}
        </button>
      </form>
    </Form>
  )
}
