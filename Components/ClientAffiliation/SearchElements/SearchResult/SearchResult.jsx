import authentificationManagement from "../../../../Stores/Authentification"
import useCases from "../../../../Stores/useCases"
import UserProfile from "../../../../utils/UserProfile/UserProfile"
import './SearchResult.css'

export default function SearchResult() {
    const {
        searchResult,
        searchLoading,
        selectClient,
        selectedClient
    } = useCases()

    return <div className="search-result">
        {searchLoading ? <span className="loading-message pad-2 s-fs st-c">Wait for searching..</span> :
            Array.isArray(searchResult) ? (
                searchResult.length > 0 ? (
                    searchResult.map(result => (
                        <div className={`user-item gap-1 brad-2 ${selectedClient?.id === result._id ? "active" : ""}`}
                            key={result._id}
                            onClick={() => selectClient({ id: result._id, username: result.username })}
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
                    <code className="message st-c pad-2">No client found</code>
                )
            ) : (
                <code className="message st-c  pad-2">Search for client</code>
            )}
    </div>
}