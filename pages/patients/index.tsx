import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import {useRouter} from "next/router";

export default function PatientsList() {

  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  useEffect(() => {
    setLoading(true)
    axios.get('https://dentalcare-backend.vercel.app/v1/patients')
    .then((res) => {
      console.log(res.data)
      setPatients(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  function redirect(id:any) {
    router.push(`/patients/${id}`)
  }
  return (
    <>
    {loading && 
      <>
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          {/* <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p> */}
        </div>
      </>
      }
    <div className="">  
      <div className="flex">
        <div className="sm:flex-auto">
          <div className="flex w-[60%]">
            <div className="w-full">
                <label htmlFor="search" className="sr-only">
                Search
                </label>
                <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                />
                </div>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push('/patients/new')}
          >
            Add Patient
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root px-4">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="min-w-full shadow rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-blue-50 border-b-2 border-blue-100">
                  <th scope="col" className="py-[24px] px-[24px] text-left text-xs font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th scope="col" className="py-[24px] px-[16px] text-left text-xs font-semibold text-gray-700 uppercase">
                    Address
                  </th>
                  <th scope="col" className="py-[24px] px-[16px] text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th scope="col" className="relative py-[24px] px-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {patients.map((person:any) => (
                  <tr key={person.email} className="hover:bg-gray-50 cursor-pointer" onClick={()=>redirect(person.id)}>
                    <td className="whitespace-nowrap py-5 px-4 text-sm">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU"} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{person.patientName}</div>
                          <div className="mt-1 text-gray-500">{person.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="mt-1 text-gray-500">{person.patientAddress}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-center text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only"></span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
