import { useEffect, useRef, useState } from "react"
import useCases from "../../Stores/useCases"
import "./FilterContainer.css"
import { useSearchParams } from "react-router-dom"

export default function FilterContainer({ entries }) {

    const { filterIsOpen } = useCases()
    const filterWrapper = useRef(null)
    const filterContainer = useRef(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!filterContainer.current) return

        const observer = new ResizeObserver(() => {
            const styles = getComputedStyle(filterContainer.current)
            const borderTop = parseInt(styles.borderTopWidth)
            const borderBottom = parseInt(styles.borderTopWidth)

            requestAnimationFrame(() => {
                const height = filterContainer.current.scrollHeight + borderTop + borderBottom
                setContainerHeight(height)
            })

        })

        observer.observe(filterContainer.current)

        return () => observer.disconnect()

    }, [])


    useEffect(() => {
        if (!filterWrapper.current) return

        requestAnimationFrame(() => {
            filterWrapper.current.style.height =
                filterIsOpen ? `${containerHeight}px` : "0px"
        })

    }, [filterIsOpen, containerHeight])

    const setFilter = (value) => {
        setSearchParams(prev => ({
            ...Object.fromEntries(prev.entries()),
            filter: value,
            page: 1
        }))
    }

    const setTimeFilter = (value) => {
        setSearchParams(prev => ({
            ...Object.fromEntries(prev.entries()),
            time: value,
            page: 1
        }))
    }

    useEffect(() => {
        if (!filterContainer.current) return
        const filterItems = filterContainer.current.querySelectorAll(".filter-item")

        filterItems.forEach(item => {
            if (item.dataset.value === searchParams.get("filter") || item.dataset.value === searchParams.get("time")) {
                item.classList.add("active")
            } else {
                item.classList.remove("active")
            }
        })

    }, [searchParams.get("filter"), searchParams.get("time")])

    return (
        <div className="filter-wrapper" ref={filterWrapper}>
            <div
                ref={filterContainer}
                className="filter-container flex flex-d-c gap-2 br bgc-lv3 brad-3 pad-1"
            >
                <div className="filter-type flex flex-d-c gap-2">
                    <span className="title s-fs">Time</span>

                    <div className="filter-items-container flex gap-1">
                        <div className="filter-item" data-value="newest" onClick={() => setTimeFilter("newest")}>Newest</div>
                        <div className="filter-item" data-value="oldest" onClick={() => setTimeFilter("oldest")}>Oldest</div>
                    </div>
                </div>

                <div className="filter-type flex flex-d-c gap-2">
                    <span className="title s-fs">{entries?.title}</span>

                    <div className="filter-items-container flex gap-1">
                        <div className="filter-item" data-value="all" onClick={() => setFilter("all")}>All</div>
                        {entries?.data?.map((d, i) => (
                            <div className="filter-item" data-value={d.type} key={i} onClick={() => setFilter(d.type)}>
                                {d.value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
