'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI/table'

import Image from 'next/image'
import { Circle, DotsThree } from 'phosphor-react'

import photo from '../../assets/no-picture.webp'

export function Occurrences() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Data do registro</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-left w-14"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <span className="flex items-center gap-2 flex-wrap">
              <Image
                src={photo}
                width={50}
                height={30}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span>Daniel Moniz</span>
            </span>
          </TableCell>
          <TableCell>24 de Jan, 2023</TableCell>
          <TableCell>
            <span className="px-3 inline-flex items-center gap-2 text-sm font-medium  tracking-wider text-red-800 bg-red-200 rounded-full bg-opacity-50">
              <span>
                <Circle weight="fill" />
              </span>
              <span>Cancelada</span>
            </span>
          </TableCell>
          <TableCell className="text-left w-14">
            <DotsThree size={24} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <span className="flex items-center gap-2 flex-wrap">
              <Image
                src={photo}
                width={50}
                height={30}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span>Daniel Moniz</span>
            </span>
          </TableCell>
          <TableCell>24 de Jan, 2023</TableCell>
          <TableCell>
            <span className="px-3 inline-flex items-center gap-2 text-sm font-medium  tracking-wider text-green-800 bg-green-200 rounded-full bg-opacity-50">
              <span>
                <Circle weight="fill" />
              </span>
              <span>Resolvida</span>
            </span>
          </TableCell>
          <TableCell className="text-left w-14">
            <DotsThree size={24} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <span className="flex items-center gap-2 flex-wrap">
              <Image
                src={photo}
                width={50}
                height={30}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span>Daniel Moniz</span>
            </span>
          </TableCell>
          <TableCell>24 de Jan, 2023</TableCell>
          <TableCell>
            <span className="px-3 inline-flex items-center gap-2 text-sm font-medium  tracking-wider text-green-800 bg-green-200 rounded-full bg-opacity-50">
              <span>
                <Circle weight="fill" />
              </span>
              <span>Resolvida</span>
            </span>
          </TableCell>
          <TableCell className="text-left w-14">
            <DotsThree size={24} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
