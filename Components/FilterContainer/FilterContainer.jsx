import { useEffect, useRef, useState } from "react"
import useCases from "../../Stores/useCases"
import "./FilterContainer.css"
import { useSearchParams } from "react-router-dom"

export default function FilterContainer({ entries, isOpen, setFilterIsOpen }) {

    const filterWrapper = useRef(null)
    const filterContainer = useRef(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!filterContainer.current) return
        const styles = getComputedStyle(filterContainer.current)
        const borderTop = parseInt(styles.borderTopWidth)
        const borderBottom = parseInt(styles.borderBottomWidth)

        const observer = new ResizeObserver(() => {

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
                isOpen ? `${containerHeight}px` : "0px"
        })

    }, [isOpen, containerHeight])

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
                <div className="close-filter-container-btn">
                    <button className="brad-1 br flex-c" onClick={() => setFilterIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
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
                            <div className="filter-item" data-value={d.value} key={i} onClick={() => setFilter(d.value)}>
                                {d.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
