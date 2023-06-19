export const apiURL = "https://ofs-alpha-document-parser.apps.nlpcore.net/attachments/upload"

export interface ResponseObject {
    success: boolean,
    message?: string,
    data?: {
        agent_bridge_url: string,
        quote_number: string,
        total: {
            annual_premium: number
        },
        policy_id: string,
        DIC_present: string,
        items: any[]
    },
    raw_output: string,
    coverage_a: number
}

export interface DataRecordProps {
    id: string,
    status: string[],

    request_container: string[],
    request_container_obj: QuoteRequest,

    response?: string[],
    response_obj?: ResponseObject
}

interface Locations {
    address_line1: string,
}

interface NamedInsured {
    addresses: Locations[],
    name: string
}

export interface QuoteRequest {
    policy_type_name: string,
    effective_date: string,
    locations: Locations[],
    named_insureds: NamedInsured[]
}

export interface RecordProps {
    [x: string]: any;
    length: number;
    file_name: string[],
    id: string,
    submitted_on: string[],
    data_records: DataRecordProps[]
}

export const getApiURL = () => {
    const params = {
        function: "get-session-data"
    };
    const query = new URLSearchParams(params).toString();
    return `${apiURL}?${query}`;
}

export const GetData = () => {
    return fetch(getApiURL(), {
        method: 'POST',
        mode: 'cors',
    })
        .then(res => {
            return res.json();
        })
}

export async function GetDataAsync(): Promise<RecordProps[]> {
    const res = await fetch(getApiURL(), {
        method: 'POST',
        mode: 'cors',
    });
    return await res.json();
}

export async function GetPolicyDataAsync(policyID: string|null): Promise<RecordProps | null> {
    const res = await fetch(getApiURL(), {
        method: 'POST',
        mode: 'cors',
    });
    const policiesData: RecordProps[] = await res.json();

    let result: RecordProps | null = null;
    policiesData.forEach((policyData: RecordProps) => {
        result = policyData;
        if (policyData['id'] === policyID) {
            
            result.data_records.forEach(record => {
                record.request_container_obj = JSON.parse(record.request_container[0])['quote_info'];
                if (record.response) {
                    record.response_obj = JSON.parse(record.response[0]);
                    if (record.response_obj?.data?.items) {
                        record.response_obj.data.items.forEach((obj) => {
                            if (obj.name.includes("Dwelling")) {
                                if (record.response_obj) {
                                    record.response_obj.coverage_a = obj.limit;
                                }
                            }
                        })
                    }
                }
            })
        }
    })
    return result;
}
