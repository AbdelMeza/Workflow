import './ActivityPage.css'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import Container from '../../../Components/Container/Container'
import activitesManagement from '../../../Stores/AcitiviesManagement'
import Activity from '../../../Components/RecentActivity/Activity'

export default function ActivityPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { activitiesData, loadingState } = activitesManagement()

    const page = parseInt(searchParams.get("page")) || 1

    const activities = activitiesData.data.activities || []
    const totalPages = activitiesData.pagination?.totalPages || 1

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ filter: "all", page: 1, limit: 7 })
        }
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
                    <Button
                        content="Filter"
                        classGiven="bgc-lv3 br h-2 brad-2"
                    />
                </div>
            </div>

            <div className="activity-container">
                <Container
                    headerTitle="All activities"
                    hasPag={true}
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
                    ) : (
                        <code className="empty-data pad-3 st-c">
                            No activity in sight
                        </code>
                    )}
                </Container>
            </div>
        </div>
    )
}
