import { Policies } from "@apollo/client/cache";

export type policiesType = { 
    policy_type_name: string; 
    effective_date: string; 
    agent_bridge_url: any; 
    dic: string; 
    named_insured: string; 
    bamboo_premium: number; 
    premium: number; 
    coverage_a: number; 
    coverages: []; 
    status: string; 
}

export type PolicyContextType = {
    policyDataState: Array<policiesType>
    getPolicyById:()=>void
    updatePage:(pageNumber:number)=>void
    getPolicyByStatus:()=>void
    setPolicyStatus:(status:string)=>void
    
}


export type policyRecord = {
    name: string;
    carrier: string;
    date: string;
    premium: string;
    status: string;
}

export type slideOverType = {
    heading: string;
    data: policyRecord|undefined;
    mode: string;
}

export  type UploadRowDataProps = {
    id: string;
    file_name: string;
    submitted_on: string;
    data_records: [];
}

export type EditableCellProps = {
    value: string | number;
    row: {index: number};
    column: {id: string};
    updateMyData: (index: number, id: string, value: string|number)=>void
}