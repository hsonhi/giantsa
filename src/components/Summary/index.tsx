import Link from 'next/link'
import { ArrowRight, HourglassMedium, Tag, User } from 'phosphor-react'

export function Summary() {
  return (
    <div className="-mt-20 pt-9 pb-10">
      <div className="max-w-7xl px-2 mx-auto gap-4 flex items-center justify-between overflow-y-hidden lg:px-8 sm:px-6 ">
        <article className="bg-gray-50 p-4 rounded-lg border border-gray-300 flex flex-col gap-2 lg:gap-4 min-w-fit flex-1">
          <header className="flex items-center justify-between gap-2 border-b pb-2">
            <div className="flex items-center gap-4 ">
              <div className="lg:w-10 lg:h-10 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center lg:text-base text-sm">
                <User className="text-green-600" weight="duotone" />
              </div>
              <strong className="lg:text-2xl text-xl text-gray-800 font-medium">
                Total de clientes
              </strong>
            </div>

            <Link href="#">
              <ArrowRight size={24} />
            </Link>
          </header>

          <strong className="font-medium sm:text-5xl text-2xl text-gray-900">
            215
          </strong>
        </article>
        <article className="bg-gray-50 p-4 rounded-lg border border-gray-300 flex flex-col gap-2 lg:gap-4 min-w-fit flex-1">
          <header className="flex items-center justify-between gap-2 border-b pb-2">
            <div className="flex items-center gap-4 ">
              <div className="lg:w-10 lg:h-10 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center lg:text-base text-sm">
                <Tag className="text-blue-600" weight="duotone" />
              </div>
              <strong className="lg:text-2xl text-xl text-gray-800 font-medium">
                Apólices emitidas
              </strong>
            </div>

            <Link href="#">
              <ArrowRight size={24} />
            </Link>
          </header>

          <strong className="font-medium sm:text-5xl text-2xl text-gray-900">
            465
          </strong>
        </article>
        <article className="bg-gray-50 p-4 rounded-lg border border-gray-300 flex flex-col gap-2 lg:gap-4 min-w-fit flex-1">
          <header className="flex items-center justify-between gap-2 border-b pb-2">
            <div className="flex items-center gap-4 ">
              <div className="lg:w-10 lg:h-10 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center lg:text-base text-sm">
                <HourglassMedium className="text-red-600" weight="duotone" />
              </div>
              <strong className="lg:text-2xl text-xl text-gray-800 font-medium">
                Sinistros pendentes
              </strong>
            </div>

            <Link href="#">
              <ArrowRight size={24} />
            </Link>
          </header>

          <strong className="font-medium sm:text-5xl text-2xl text-gray-900">
            18
          </strong>
        </article>
      </div>
    </div>
  )
}
