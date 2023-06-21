
import Dropdown from '@components/dropdown'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Example() {

  const [employees, setEmployees] = useState([])
  const [insurance, setInsurance] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedInsurance, setSelectedInsurance] = useState("")
  const router = useRouter();
  useEffect(()=>{
    axios.get('http://localhost:3000/v1/patients/employee')
    .then((res) => {
      console.log(res.data)
      setEmployees(res.data['employees'])
      setInsurance(res.data['insurance'])
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const submitForm = (e: any) => {
    console.log("submit form")
    e.preventDefault()

    if(selectedEmployee === undefined || selectedEmployee === ""){
      document.getElementById("headlessui-menu-button-1")?.focus()
      return
    }

    if(selectedInsurance === undefined || selectedInsurance === ""){
      document.getElementById("headlessui-menu-button-")?.focus()
      alert("Please select insurance")
      return
    }

    const data = {
      "patientName": e.target.first_name.value + " " + e.target.last_name.value,
      "email": e.target.email.value,
      "patientContactNo": e.target.contact.value,
      "patientAddress": e.target.address.value + ","
                + e.target.city.value + ","
                + e.target.state.value + ","
                + e.target.zip.value,
      "employerID": selectedEmployee,
      "insurerID": selectedInsurance
    }
    console.log(data)

    axios.post('http://localhost:3000/v1/patients', data)
    .then((res) => {
      console.log(res.data)
      alert("Patient created successfully")
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      router.push('/patients')
    })


  }

  return (
    <div className="mx-auto max-w-7xl p-8 bg-white shadow">
      <form onSubmit={submitForm}>
        <div className="space-y-12">

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Patient Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Contact *
                </label>
                <div className="mt-2">
                  <input
                    id="contact"
                    name="contact"
                    type="contact"
                    autoComplete="contact"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address *
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                  Address *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    autoComplete="zip"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Insurance Informations</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Select the right insurance for your needs.
              </p>
            </div>

            <div className="max-w-2xl space-y-10 md:col-span-2">
              <fieldset>
                <legend className="text-sm font-medium leading-6 text-gray-900">Select Employee *</legend>
                <div className="mt-2 mb-8">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 min-w-[180px]">
                      <Dropdown items={employees} setId={setSelectedEmployee} error={selectedEmployee === ''}/>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-medium leading-6 text-gray-900">Select Insurance *</legend>
                <div className="mt-2 mb-8">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 min-w-[180px]">
                      <Dropdown items={insurance} setId={setSelectedInsurance} error={selectedInsurance === ''}/>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
