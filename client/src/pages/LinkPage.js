import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/context";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinkPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            console.log('call fetchLinks')
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log('fetched:', fetched)
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading)
        return <Loader/>

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}
