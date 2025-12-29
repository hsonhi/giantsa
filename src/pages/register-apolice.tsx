import Link from 'next/link'

import { ArrowLeft } from 'phosphor-react'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { DefaultLayout } from '@/components/DefaultLayout'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'
import { IClient } from '@/schema/Client'
import { IVehicle } from '@/schema/Vehicle'
import { ITypesApolice } from '@/schema/TypesApolice'
import { ITypology } from '@/schema/Typology'

import { SubHeader } from '@/components/Header/SubHeader'
import { CreateApoliceForm } from '@/components/Pages/CreateApoliceForm'

interface ServerSideProps {
  serverData: {
    clients: IClient[]
    vehicles: IVehicle[]
    types: ITypesApolice[]
    typologies: ITypology[]
  }
}

const RegisterApolice: NextPageWithLayout = ({
  serverData,
}: ServerSideProps) => {
  const { clients, types, typologies, vehicles } = serverData

  return (
    <>
      <SubHeader>
        <div className="flex items-center flex-wrap-reverse  gap-8">
          <Link
            href="/"
            className="p-3 bg-zinc-700 hover:bg-zinc-800 rounded text-gray-100 font-medium"
          >
            <ArrowLeft />
          </Link>

          <strong className="text-2xl font-medium text-gray-200">
            Registar Apólice Automóvel
          </strong>
        </div>
      </SubHeader>
      <section className=" mt-6">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-6">
          <CreateApoliceForm
            clients={clients}
            types={types}
            typologies={typologies}
            vehicles={vehicles}
          />
        </div>
      </section>
    </>
  )
}

RegisterApolice.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Make request in same time as the server side
    const [
      vehiclesResponse,
      typesApolicesResponse,
      tipologiaApoliceResponse,
      clientsResponse,
    ] = await Promise.all([
      api.get('/vehicles'),
      api.get('/apolicetipos'),
      api.get('/apolicevalores'),
      api.get('/clients'),
    ])

    const vehicles = vehiclesResponse.data['']
    const typologies = tipologiaApoliceResponse.data['']
    const clients = clientsResponse.data['']
    const types = typesApolicesResponse.data['']

    const serverData = {
      vehicles,
      typologies,
      clients,
      types,
    }

    return {
      props: {
        serverData,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default RegisterApolice
