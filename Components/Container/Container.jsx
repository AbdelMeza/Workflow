import { useEffect } from 'react'
import './Container.css'

export default function Container({ title, headerTitle, hasPag, children, currentPage, totalPages, onPageChange }) {

    const handlePrev = () => {
        if (currentPage > 1 && onPageChange) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages && onPageChange) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className="container flex flex-d-c gap-2 pad-1 bgc-lv3 br brad-3" id={title}>
            <div className="container-header">
                <span className="header s-fs">{headerTitle}</span>
            </div>
            <div className="content bgc-lv2 br brad-2">
                {children}
            </div>

            {hasPag && totalPages > 1 && (
                <div className="pagination-container flex gap-2">
                    <button onClick={handlePrev} disabled={currentPage === 1} className="page-btn br h-1 flex-c bgc-lv3 brad-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>   

                    {
                        <div className="pages-display flex-c s-fs mt-c">
                            {`Page ${currentPage} of ${totalPages}`}
                        </div>
                    }

                    <button onClick={handleNext} disabled={currentPage === totalPages} className="page-btn br h-1 flex-c bgc-lv3 brad-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}
