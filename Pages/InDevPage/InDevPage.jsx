import './InDevPage.css'

export default function InDevPage() {
    return <div className="page-in-developement flex-c">
        <div className="content flex-c flex-d-c gap-2 st-c">
            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
            <span className="message s-fs">This page is under construction</span>
        </div>
    </div>
}