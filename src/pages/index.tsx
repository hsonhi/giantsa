import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { NextPageWithLayout } from './_app'
import { Summary } from '@/components/Summary'
import { CalendarBlank, FilePlus, Funnel, UserSquare } from 'phosphor-react'
import { DefaultLayout } from '@/components/DefaultLayout'
import { parseCookies } from 'nookies'
import { Occurrences } from '@/components/Pages/Occurrences'
import { DataPicker } from '@/components/ui/dataPicker'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="bg-zinc-900">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 pt-9 pb-20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center flex-wrap-reverse  gap-8">
            <Link
              href="/register-apolice"
              className="sm:p-3 p-2 bg-zinc-700 hover:bg-zinc-800 rounded text-gray-100 font-medium"
            >
              Novo apólice
            </Link>
          </div>

          <Link
            href="/register-sinistro"
            className="sm:p-3 p-2 bg-amber-500 hover:bg-amber-600 rounded text-gray-100 font-medium flex  items-center gap-2 "
          >
            <FilePlus size={20} />
            Registar Sinistro
          </Link>
        </div>
      </div>
      <Summary />
      <div className="grid lg:grid-cols-3 items-start gap-3 max-w-7xl mx-auto lg:px-8 sm:px-6 px-2 w-full pb-8">
        <div className="lg:col-span-2 bg-gray-50 rounded-[10px] overflow-hidden">
          <header className="flex flex-col lg:flex-row justify-between lg:items-end gap-4 p-3">
            <div className="flex flex-col gap-3">
              <strong className="text-2xl font-medium text-gray-900">
                Ocorrências
              </strong>
              <span className="text-gray-600">
                Ocorrências chegadas no sistema
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2 overflow-hidden">
              <DataPicker />

              <button className="flex items-center bg-zinc-800 hover:bg-zinc-900 h-[38px] px-4 rounded text-gray-100 gap-2 min-w-full sm:min-w-fit">
                <Funnel size={25} />
                Filtrar
              </button>
            </div>
          </header>

          <div className="overflow-auto">
            <Occurrences />
          </div>
        </div>
        <div className="col-span-1 bg-gray-50 p-6 rounded-[10px]">
          <header className="flex flex-col gap-3">
            <strong className="text-2xl font-medium text-gray-900">
              Apólices em final de contrato
            </strong>
            <span className="text-gray-600">
              Ocorrências chegadas no sistema
            </span>
          </header>

          <div className="flex flex-col gap-2 mt-4 py-4 border-b border-gray-300">
            <header className="flex justify-between items-center">
              <strong className="text-sm text-gray-500">#9843124</strong>
              <span className="bg-blue-200 text-blue-700 px-2">Automóvel</span>
            </header>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1 text-gray-900">
                  <UserSquare size={24} weight="duotone" />
                  João da Silva
                </span>
                <span className="flex items-center gap-1 text-red-700">
                  <CalendarBlank size={24} weight="duotone" />
                  29 de Julho de 2023
                </span>
              </div>

              <Link href="#" className="text-orange-600 underline">
                Ver
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 py-4 border-b border-gray-300">
            <header className="flex justify-between items-center">
              <strong className="text-sm text-gray-500">#9843124</strong>
              <span className="bg-blue-200 text-blue-700 px-2">Automóvel</span>
            </header>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1 text-gray-900">
                  <UserSquare size={24} weight="duotone" />
                  João da Silva
                </span>
                <span className="flex items-center gap-1 text-red-700">
                  <CalendarBlank size={24} weight="duotone" />
                  29 de Julho de 2023
                </span>
              </div>

              <Link href="#" className="text-orange-600 underline">
                Ver
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 py-4 border-b border-gray-300">
            <header className="flex justify-between items-center">
              <strong className="text-sm text-gray-500">#9843124</strong>
              <span className="bg-yellow-200 text-yellow-700 px-2">Saúde</span>
            </header>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1 text-gray-900">
                  <UserSquare size={24} weight="duotone" />
                  João da Silva
                </span>
                <span className="flex items-center gap-1 text-red-700">
                  <CalendarBlank size={24} weight="duotone" />
                  29 de Julho de 2023
                </span>
              </div>

              <Link href="#" className="text-orange-600 underline">
                Ver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (!cookies['@giant.token']) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Home
