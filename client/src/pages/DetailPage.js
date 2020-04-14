import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/context";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const getLink = useCallback(async () => {
        try {
            console.log("call getLink:", linkId, "\ntoken:", token)
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("fetched:", fetched)
            setLink(fetched)
        } catch (e) {
        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading)
        return <Loader/>
    console.log("link:", link)
    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}
