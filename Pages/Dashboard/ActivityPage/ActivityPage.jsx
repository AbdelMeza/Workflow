import './ActivityPage.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import Container from '../../../Components/Container/Container'
import activitesManagement from '../../../Stores/AcitiviesManagement'
import Activity from '../../../Components/RecentActivity/Activity'
import FilterContainer from '../../../Components/FilterContainer/FilterContainer'

export default function ActivityPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const { activitiesData, getActivityTypes, activityTypes, loadingState } = activitesManagement()

    const page = parseInt(searchParams.get("page")) || 1
    const filter = searchParams.get("filter") || "all"

    const activities = activitiesData.data.activities || []
    const totalPages = activitiesData.pagination?.totalPages || 1

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ filter: "all", page: 1, limit: 7, time: "newest" })
        }

        const fetchData = async () => {
            await getActivityTypes()
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setSearchParams(prev => ({
                ...Object.fromEntries(prev),
                page: totalPages
            }))
        }
    }, [page, totalPages])

    return (
        <div className="activity flex flex-d-c gap-3">
            <div className="header-container">
                <div className="side-content">
                    <span className="page-title s-fs mt-c">Activity</span>
                </div>
                <div className="side-content">
                    <div onClick={() => setFilterIsOpen(!filterIsOpen)}>
                        <Button
                            content={
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                    </svg>
                                    Filter
                                </>
                            }
                            classGiven="bgc-lv3 br h-2 brad-2"
                        />
                    </div>
                </div>
            </div>
            <FilterContainer entries={activityTypes} isOpen={filterIsOpen} setFilterIsOpen={setFilterIsOpen} />
            <div className="activity-container">
                <Container
                    headerTitle="All activities"
                    hasPag={activitiesData.pagination.totalPages > 1}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={(newPage) => {
                        setSearchParams(prev => ({
                            ...Object.fromEntries(prev),
                            page: newPage
                        }))
                    }}
                >
                    {loadingState ? (
                        <span className="Loading-message s-fs st-c pad-3">
                            Wait for loading..
                        </span>
                    ) : activities.length > 0 ? (
                        <div className="activity-list flex flex-d-c">
                            {activities.map((activity) => (
                                <Activity
                                    key={activity._id}
                                    type={activity.type}
                                    title={activity.title}
                                    details={activity.details}
                                    time={activity.createdAt}
                                />
                            ))}
                        </div>
                    ) : filter === "all" ? (
                        <code className="empty-data pad-3 st-c">
                            No activity in sight
                        </code>
                    ) : (
                        <code className="empty-data pad-3 st-c">
                            No activities found with <b>{filter}</b> filter
                        </code>
                    )}
                </Container>
            </div>
        </div>
    )
}
