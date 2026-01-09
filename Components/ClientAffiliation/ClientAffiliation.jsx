import { useSearchParams } from 'react-router-dom'
import './ClientAffiliation.css'
import useCases from '../../Stores/useCases'
import { useEffect, useRef } from 'react'
import UserProfile from '../../utils/UserProfile/UserProfile'
import projectsManagement from '../../Stores/projectsManagement'
import { socket } from '../../src/socket'
import authentificationManagement from '../../Stores/Authentification'

export default function ClientAffiliation({ projectId }) {
    const {
        searchClient,
        searchResult,
        affiliateClientIsOpen,
        toggleAffiliateClient,
        affiliateClient,
        loadingState,
        searchLoading
    } = useCases()
    const searchInput = useRef(null)
    const { userData } = authentificationManagement()
    const { getProjects, pageData } = projectsManagement()
    const [searchParams, setSearchParams] = useSearchParams()
    const [queryParams, setQueryParams] = useSearchParams()

    const search = searchParams.get("search") || ""
    const page = parseInt(queryParams.get("page")) || 1
    const limit = parseInt(queryParams.get("limit")) || 5

    useEffect(() => {
        searchInput.current.value = ""
        
        if (!affiliateClientIsOpen) {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev)
                params.delete("search")
                return params
            })
        }
    }, [affiliateClientIsOpen])

    useEffect(() => {
        const searchTimeOut = setTimeout(() => {
            searchClient(search)
        }, 300)

        return () => clearTimeout(searchTimeOut)
    }, [search])

    const handleAddClient = async (clientId) => {
        await affiliateClient({ projectId, clientId, userId: userData._id })
        const fetchData = async () => {
            await getProjects({ page, limit })
        }

        fetchData()
        toggleAffiliateClient()
    }

    return <div className={`client-affiliation ${affiliateClientIsOpen ? "open" : "closed"}`}>
        <div className="close-btn bgc-lv3 h-1 br brad-1 flex-c" onClick={() => toggleAffiliateClient()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>

        <div className="content flex flex-d-c bgc-lv3 br brad-2">
            {loadingState ? <span className="loading-message pad-3 s-fs st-c">Adding client to project..</span> :
                <>
                    <div className="upper-content pad-1 search-bar-container">
                        <div className="search-bar h-2 bgc-lv2 br brad-2">
                            <div className="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input type="text" className="search-input" placeholder='Search..' ref={searchInput} maxLength={13} onChange={(e) => {
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
                            <div className="indication">
                                <code className="key bgc-lv3 br">ENTER</code>
                            </div>
                        </div>
                    </div>
                    <div className="lower-content result-container">
                        {searchLoading ? <span className="loading-message pad-2 s-fs st-c">Wait for searching..</span> :
                            Array.isArray(searchResult) ? (
                                searchResult.length > 0 ? (
                                    searchResult.map(result => (
                                        <div className="user-item gap-1 brad-2"
                                            key={result._id}
                                            onClick={() => handleAddClient(result._id)}
                                        >
                                            <div className="side-content">
                                                <UserProfile username={result.username} />
                                            </div>
                                            <div className="side-content flex flex-d-c">
                                                <span className="s-fs">{result.username}</span>
                                                <span className="s-fs st-c">{result.email}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <code className="message st-c">No client found</code>
                                )
                            ) : (
                                <code className="message st-c">Search for client</code>
                            )}

                    </div>
                </>}
        </div>
    </div>
}