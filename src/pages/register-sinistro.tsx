import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { DefaultLayout } from '@/components/DefaultLayout'
import { SubHeader } from '@/components/Header/SubHeader'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { IClient } from '@/schema/Client'
import { IVehicle } from '@/schema/Vehicle'
import { ICity } from '@/schema/City'

import { IApolice } from '@/schema/Apolice'
import { RegisterSinistroForm } from '@/components/Pages/RegisterSinistroForm'

interface ServerSideProps {
  serverData: {
    clients: IClient[]
    vehicles: IVehicle[]
    cities: ICity[]
    apolices: IApolice[]
  }
}

const RegisterSinistro: NextPageWithLayout = ({
  serverData,
}: ServerSideProps) => {
  const { apolices, cities, clients, vehicles } = serverData

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
            Registar Sinistro
          </strong>
        </div>
      </SubHeader>
      <section className=" mt-6">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-6">
          <RegisterSinistroForm
            apolices={apolices}
            cities={cities}
            clients={clients}
            vehicles={vehicles}
          />
        </div>
      </section>
    </>
  )
}

RegisterSinistro.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Make request in same time as the server side
    const [
      vehiclesResponse,
      apolicesResponse,
      clientsResponse,
      citiesResponse,
    ] = await Promise.all([
      api.get('/vehicles'),
      api.get('/apolices'),
      api.get('/clients'),
      api.get('/city'),
    ])

    const vehicles = vehiclesResponse.data['']
    const apolices = apolicesResponse.data['']
    const clients = clientsResponse.data['']
    const cities = citiesResponse.data['']

    const serverData = {
      vehicles,
      apolices,
      clients,
      cities,
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

export default RegisterSinistro
