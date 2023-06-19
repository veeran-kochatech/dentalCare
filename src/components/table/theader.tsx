import SortTable from '@components/elements/sortTable';
import { HeaderProps, TableContextType } from '../../types/table.types';
import { useContext, useEffect, useState } from 'react'
import { TableContext } from "@context/tableContext";

function Theader(){
    const useTodosContext = () => useContext<TableContextType>(TableContext);
    const { tableColumnsState } = useTodosContext();

    const [head, setHead] = useState(tableColumnsState);
    const [update, setUpdate] = useState(true)

    useEffect(()=>{
        setHead(tableColumnsState)
        setUpdate(!update)
    },[tableColumnsState])

    return (
        <thead className="bg-[#EEEEEE]">
            <tr>
                {head.map((row:HeaderProps)=>{
                    if(row.selectedColumn === true){
                        return(
                            <th scope="col" className="pt-4 pb-2 pl-4 pr-3 text-left text-sm text-tHead font-medium h-[70px]">
                                <div className="flex justify-content items-center px-4">
                                    <span className="pr-4">{row.title}</span>
                                    {/* {row.sort &&
                                    <SortTable
                                        label={"name"} 
                                        handleSort={( x: string,y: string)=>console.log(x)}
                                        />
                                    } */}
                                </div>
                            </th>
                        )
                    }
                })}
                
            </tr>
        </thead>
    )
}

export default Theader;