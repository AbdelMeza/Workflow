import './ClientAffiliation.css'
import { useEffect } from 'react'
import Button from '../Button/Button'
import clientAffilationManagement from '../../Stores/clientAffilationManagement'
import SearchBar from './SearchElements/SearchBar/SearchBar'
import SearchResult from './SearchElements/SearchResult/SearchResult'
import authentificationManagement from '../../Stores/Authentification'

export default function ClientAffiliation({ projectId }) {
    const {
        affiliateClientIsOpen,
        toggleAffiliateClient,
        affiliateClient,
        loadingState,
        selectClient,
        selectedClient,
        searchResult
    } = clientAffilationManagement()

    const { userData } = authentificationManagement()

    useEffect(() => {
        if (!searchResult) {
            selectClient(null)
        }
    }, [searchResult])

    useEffect(() => {
        if (!affiliateClientIsOpen) {
            selectClient(null)
        }
    }, [affiliateClientIsOpen])

    const handleAddClient = async () => {
        await affiliateClient({ projectId, userId: userData._id })
        toggleAffiliateClient()
    }

    return <div className={`client-affiliation ${affiliateClientIsOpen ? "open" : "closed"}`}>
        <div className="close-btn bgc-lv3 h-1 br brad-2 flex-c" onClick={() => toggleAffiliateClient()}>
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

        <div className="content flex flex-d-c bgc-lv3 br brad-3">
            {loadingState ? <span className="loading-message pad-3 s-fs st-c">Adding client to project..</span> :
                <>
                    <div className="upper-content search-bar-container">
                        <SearchBar placeholder={"Search.."} />
                    </div>
                    <div className="middle-content result-container">
                        <SearchResult expectedResult={"clients"} />
                    </div>
                    <div className="lower-content" style={{ padding: selectedClient ? " 0 var(--padding-lv1) var(--padding-lv1) var(--padding-lv1)" : "0" }}>
                        {selectedClient &&
                            <div className="add-client-btn" onClick={() => handleAddClient()}>
                                <Button
                                    content="Add client"
                                    size="medium"
                                    classGiven=" btn-bgc brad-2"
                                />
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    </div>
}