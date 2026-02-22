import './SearchBar.css'
import { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import clientAffilationManagement from "../../../../Stores/clientAffilationManagement"
import searchManagement from '../../../../Stores/searchManagement'

export default function SearchBar({ placeholder, indicators, maxLength }) {
    const { searchClient } = searchManagement()
    const {
        affiliateClientIsOpen,
        projectFormIsOpen
    } = clientAffilationManagement()

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get("search") || ""
    const searchInput = useRef(null)

    useEffect(() => {
        searchInput.current.value = ""

        if (!affiliateClientIsOpen || !projectFormIsOpen) {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev)
                params.delete("search")
                return params
            })
        }
    }, [affiliateClientIsOpen, projectFormIsOpen])

    useEffect(() => {
        const searchTimeOut = setTimeout(() => {
            searchClient(search)
        }, 300)

        return () => clearTimeout(searchTimeOut)
    }, [search])

    return <div className="search-bar h-2 bgc-lv2 br brad-2">
        <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
        <input type="text" className="search-input" placeholder={placeholder} ref={searchInput} maxLength={maxLength} onChange={(e) => {
            const value = e.target.value
            setSearchParams(prev => {
                const params = new URLSearchParams(prev)

                if (value) {
                    params.set("search", value)
                } else {
                    params.delete("search")
                }

                return params
            })
        }} />
        {indicators &&
            <div className="indication">
                {indicators.map((key, index) => (<code className="key bgc-lv3 br" key={index}> {key} </code>))}
            </div>
        }
    </div>
}