import { useContext, useState } from "react"
import TopBar from "@components/elements/tobBar"
import Upload from "./upload"
import EditableTable from "./table"
import { UploadContext } from "@context/uploadContext"
import {UploadContextType} from '../../types/upload.types'
import Pagination from "../elements/pagination2"  
  
export default function UploadQuote() {
    
  const usePolicyContext = () => useContext<UploadContextType>(UploadContext);
  const {uploadDataState, updatePage} = usePolicyContext();
  
  const [showUpload, setShowUpload] = useState(false)
  const filters: string[] = []

  return (
    <div>
      {showUpload && <Upload/>}
      <TopBar 
        filters={filters} 
        handleUpload={() => setShowUpload(!showUpload)} 
        deleteIcon={false} 
        updateStatus={(x)=>console.log}/>
      <EditableTable makeData={uploadDataState}/>
      <Pagination
        type={""} 
        onNext={()=>updatePage(1)} 
        onPrevious={()=>updatePage(0)}
      />
    </div>
  )
  }
  