import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline'
import ModalWrapper from "@components/elements/modalWrapper"
import Loader from '@components/elements/loader'
import axios from 'axios'
import { SimpleAlert } from '@components/elements/simpleAlert'
import { apiURL } from 'src/api'

export default function Upload() {
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])


  const onDrop = useCallback(acceptedFiles => {
    const files = acceptedFiles.map((file: any) => {
        console.log("acceptedFiles ", file)
        });
    setUploadedFiles(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
                                                                    onDrop,
                                                                    accept: {
                                                                      'PDF': ['.pdf'],
                                                                      'CSV': ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
                                                                  }})
  const getApiURL = () => {
    const params = {
        function: "upload-approve"
    };

    const query = new URLSearchParams(params).toString();
    return `${apiURL}?bucket_name=bamboo&file_path=documentParser`;
}                                                               
  const uploadFiles = async() =>{
    setLoading(true)
    let url = getApiURL();
    const data = new FormData();
    data.append(`file`, uploadedFiles[0]);

    await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        onUploadProgress: (progressEvent) => {
          console.log("progressEvent ",progressEvent)
            if (progressEvent && progressEvent.total) {
                const c = (progressEvent.loaded / progressEvent.total) * 100;
            }
        }
    }).then((res) => {
      setStatus("success")
      clearStatus()
    }).catch(error => {
      console.log(error)
      setStatus("failed")
      clearStatus()
    })
    setUploadedFiles([])
    setLoading(false)
  }
  const clearStatus =()=>{
    setTimeout(()=>{
      setStatus("")
    },3000)
  }


  return (
      <ModalWrapper status={true} closeModal={async () => console.log("close")}>
        
        <div>
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Upload Files
            </Dialog.Title>
            {loading == true ?
            <div 
              className="flex flex-col justify-center items-center mt-3 text-center h-[170px] w-xl bg-primary bg-opacity-20 rounded-lg border-dashed border-gray-300 border-[1px] cursor-pointer"
            >
              <Loader/>
            </div>
            :
            <>
            <div 
              className="flex flex-col justify-center items-center mt-3 text-center h-[170px] w-xl bg-primary bg-opacity-20 rounded-lg border-dashed border-gray-300 border-[1px] cursor-pointer"
                {...getRootProps()}>
                <input {...getInputProps()} />
                <>
                  <div className='mb-2 font-medium'>Drops your file here or <span className='text-primary'>Browse</span></div>
                  <div className='text-sm font-medium'>Max. file size: 20MB</div>
                  {uploadedFiles.length > 0 && <div className='text-sm font-medium mt-4'>{uploadedFiles.length} files selected</div>}  
                </>
            </div>
            {uploadedFiles.length > 0 &&
              <div>
                  <button 
                    onClick={(e)=>uploadFiles()}
                    className='bg-gray-700 mt-4 w-full py-2 px-4 text-white rounded-lg hover:bg-gray-600'>Upload</button>
              </div>
              }
            {status === "success" &&  <SimpleAlert status={status} title={"File uploaded successfully"} />}
            {status === "failed" &&  <SimpleAlert status={status} title={"File upload failed "} />}

            <div className='mt-8 text-center text-sm font-normal'>For CSV upload , download the template <span className='text-primary cursor-pointer'>here</span></div>
            </>
          }
        </div>
      </ModalWrapper>
  )
}
