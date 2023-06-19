import SortTable from '@components/elements/sortTable'
import React, { useState } from 'react'
import { UploadRowDataProps } from '../../types/policy.types'
import Link from 'next/link';
import { BsEyeFill } from "react-icons/bs";
import moment from 'moment';
import NoData from '@components/elements/nodata';
import { HeaderProps } from '../../types/table.types';


function EditableTable({makeData}:{makeData: UploadRowDataProps[]}) {
    const columns:HeaderProps[] = [
      {
        title:"Document Name",
        sort: false,
        key:"Document Name",
        selectedColumn: true,
      },
      {
        title:"Uploaded Date",
        sort: false,
        key:"Uploaded Date",
        selectedColumn: true,
      },
      {
        title:"File ID",
        sort: false,
        key:"File ID",
        selectedColumn: true,
      },
      {
        title:"Count",
        sort: false,
        key:"Count",
        selectedColumn: true,
      },
      {
        title:"Action",
        sort: false,
        key:"Action",
        selectedColumn: true,
      },
    ];

    const [data, setData] = React.useState(makeData)
    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = useState<boolean>(false)
    const [headerGroups, setHeaderGroups] = useState<HeaderProps[]>(columns)

    React.useEffect(() => {
      
      setHeaderGroups(columns)
      setSkipPageReset(false)
    }, [data])
  
    const resetData = () => setData(originalData)
    const sort = (label:string, type:string)=>{
        return true
    }

    const getProgressBar = (progress:number)=>{
      let percentage = (progress/5)*100+ '%';
      return(
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-orange-400 h-2.5 rounded-full" style={{width : percentage}}></div>
        </div>
      )
    }


  
    return (
        <>
        <div className="inline-block min-w-full align-middle mt-4">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-[#EEEEEE]'>
                      <tr>
                        {headerGroups.length !== 0 && headerGroups.map((header) => (
                            <th className='pt-4 pb-2 pl-4 pr-3 text-left text-sm text-tHead font-medium h-[70px]'>
                              <div className="flex justify-content items-center px-4">
                                <span className="pr-4">{header.title}</span>
                                {header.sort === true &&
                                <SortTable
                                  label={"name"} 
                                  handleSort={( x: string,y: string)=>sort(x,y)}
                                  />
                                }
                                </div>
                            </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                          {makeData.length <= 0 && 
                          <tr>
                            <td colSpan={headerGroups.length}>
                            <NoData/>
                            </td>
                          </tr>
                        }
                        {makeData !== undefined && makeData.length > 0 ? 
                        makeData.map(row => {
                            return (
                                <tr id={row.id} className="cursor-pointer">
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 h-[66px] overflow-hidden truncate max-w-[320px]'>{row.file_name}</td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 h-[66px]'>{moment(row.submitted_on).format('l')}</td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 h-[66px]'>{row.id}</td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 h-[66px] text-center'>
                                    {/* {getProgressBar(4)} */}
                                    {row.data_records.length}
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 h-[66px] text-center'>
                                    <div className="flex items-center bg-white p-4 b-[1px] border-[1px] border-bordercolor1 rounded-lg max-w-[48px] hover:text-gray-700 hover:bg-gray-300">
                                      <Link href={"/policies/"+row.id}>
                                        <BsEyeFill className='text-md'/>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                            )
                        })
                        :<div></div>
                      }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
  }
export default EditableTable
