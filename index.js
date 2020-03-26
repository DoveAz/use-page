import { useState, useEffect } from 'react'
import {useDeepCompareEffect} from 'react-use'
export default function (request,query) {
    const [current, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total,setTotal] = useState(10)
    const [dataSource,setDataSource] = useState([])
    function refresh(){
        request({page: current,pageSize,...query}).then(res=>{
            setDataSource(res.data.data.list)
            setTotal(res.data.data.total)
        })
    }
    useEffect(refresh, [current, pageSize])
    useDeepCompareEffect(function(){
        setPage(1)
    },[query])
    useEffect(function(){
        refresh()
    },[query])
    return {
        dataSource,
        pagination: {
            current,
            pageSize,
            total,
            onChange(page){
                setPage(page)
            },
            onShowSizeChange(current,size){
                setPageSize(size)
            }
        },
        refresh
    }
}
