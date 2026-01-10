import './ClientAffiliation.css'
import useCases from '../../Stores/useCases'
import SearchBar from './SearchElements/SearchBar/SearchBar'
import SearchResult from './SearchElements/SearchResult/SearchResult'
import authentificationManagement from '../../Stores/Authentification'
import Button from '../Button/Button'
import { useEffect } from 'react'

export default function ClientAffiliation({ projectId }) {
    const {
        affiliateClientIsOpen,
        toggleAffiliateClient,
        affiliateClient,
        loadingState,
        selectClient,
        selectedClient
    } = useCases()


    const { userData } = authentificationManagement()

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
                        <SearchBar placeholder={"Search.."} indicators={["enter"]} />
                    </div>
                    <div className="middle-content result-container">
                        <SearchResult />
                    </div>
                    <div className={`lower-content ${selectedClient ? "pad-1" : ""}`}>
                        {selectedClient &&
                            <div className="add-client-btn" onClick={() => handleAddClient()}>
                                <Button
                                    content="Add client"
                                    size="medium"
                                    classGiven=" btn-bgc brad-1"
                                />
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    </div>
}