import './SearchResult.css'
import searchManagement from '../../../../Stores/searchManagement'
import UserProfile from "../../../../utils/UserProfile/UserProfile"
import clientAffilationManagement from '../../../../Stores/clientAffilationManagement'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function SearchResult({ expectedResult }) {
    const { searchResult, searchLoading } = searchManagement()
    const { selectClient, selectedClient } = clientAffilationManagement()
    const [searchParams, setSearchParams] = useSearchParams()

    const searchValue = searchParams.get("search") || ""

    const result = expectedResult === "clients" ? searchResult.clients :
        expectedResult === "services" ? searchResult.services : null

    return <div className="search-result">
        {searchLoading ? <span className="loading-message pad-2 s-fs st-c">Wait for searching..</span> :
            Array.isArray(result) ? (
                result.length > 0 ? (
                    result.map(result => (
                        <div className={`user-item gap-2 brad-2 ${selectedClient?.id === result._id ? "active" : ""}`}
                            key={result._id}
                            onClick={() => selectClient({ id: result._id, username: result.username })}
                        >
                            <div className="side-content">
                                <UserProfile username={result.username} />
                            </div>
                            <div className="side-content flex flex-d-c">
                                <span className="s-fs st-c">
                                    {result.username.split("").map((char, index) => (
                                        <span key={index} className={char.toLowerCase() === searchValue?.toLowerCase()?.charAt(index) ? "highlight" : ""}>{char}</span>
                                    ))}
                                </span>
                                <span className="s-fs st-c">{result.email}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <code className="message st-c pad-2">No client found</code>
                )
            ) : (
                <code className="message st-c  pad-2">Search for client</code>
            )}
    </div>
}