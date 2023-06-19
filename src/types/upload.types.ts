
export type UploadsType = { 
    attachment_id: [string]; 
    data_records: [any]; 
    file_name: string[]; 
    id: string; 
}

export type UploadContextType = {
    uploadDataState: UploadRowDataProps[]
    // getPolicyById:()=>void
    updatePage:(pageNumber:number)=>void
    // getPolicyByStatus:()=>void
    // setPolicyStatus:(status:string)=>void
    
}


export  type UploadRowDataProps = {
    id: string;
    file_name: string;
    submitted_on: string;
    data_records: [];
}
