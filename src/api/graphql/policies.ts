import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';
import { URL } from "src/lib/constants";
import { validateJwt } from 'src/utils';


export const GET_POLICIES = gql`
    query getPolicies($start: Int, $end: Int, $auth_token: String!) {
        list(start: $start, end: $end, auth_token:$auth_token) {
            request_container,
            response,
            id,
            status,
        },
    }
`;

export const GET_POLICY_BY_ID = gql`
    query getPolicyById($id: GrapheneDefaultID!, $start: Int, $end: Int, $auth_token: String!) {
        match_id(id:$id, start: $start, end: $end, auth_token:$auth_token){
            data_records{
                request_container,
                response,
                id,
                status,
            }
        }
    }
`;

export const GET_POLICY_BY_STATUS = gql`
    query getPolicyById($status: String!, $start: Int, $end: Int, $auth_token: String!) {
        search_status(status:$status, start: $start, end: $end, auth_token:$auth_token){
                request_container,
                response,
                id,
                status,
        }
    }
`;

let auth_token: string | null;
let refresh_token: string | null;
if (typeof window !== 'undefined') {
    auth_token = localStorage.getItem('authToken')
    refresh_token = localStorage.getItem('refreshToken')
}


const refreshToken = async()=>{
    try{
        const apiURL = "https://ofs-alpha-document-parser.apps.nlpcore.net/token"
        console.log("auth_token ",auth_token)
        console.log("ob ",{
            "refresh_token": refresh_token,
            "deployment_name": "bamboo",
            "grant_type": "refresh_token"
        })
        let res = await axios.post(apiURL, {
            "refresh_token":refresh_token,
            "deployment_name": "bamboo",
            "grant_type": "refresh_token"
        })
        console.log(" refresh token ", res)

        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', res.data.access_token)
            localStorage.setItem('refreshToken', res.data.refresh_token)
        }
    }
    catch(err){
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', '')
            localStorage.setItem('refreshToken', '')
        }
        console.log("err ",err)
        window.location.reload();
    }

}

async function middleware(request: any) {
    console.log(auth_token)
    const expired = await validateJwt(auth_token !== null ? auth_token : "")
    if(expired){
        await refreshToken()
    }
    console.log("middleware ",auth_token)
    console.log("request ",request)
    return {
        ...request,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth_token}`,
          },
    }
}

export const client = new GraphQLClient(URL+'/graphql/v1/bamboo/data_records', {
    requestMiddleware: middleware
});

export const client2 = new GraphQLClient(URL+'/graphql/v1/bamboo/document_schema', {
    requestMiddleware: middleware
});